import {ChangeDetectorRef, Component} from '@angular/core';
import {Events, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ServicesProvider} from "../../../providers/services/services";
import {Storage} from "@ionic/storage";
import {AddNewCustomerPage} from "../add-new-customer/add-new-customer";

/**
 * Generated class for the AddCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-customer',
  templateUrl: 'add-customer.html',
})
export class AddCustomerPage {
  clearTimeout:any;
  token:any;
  customerData:any;
  customers=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public loading: LoadingController,private service: ServicesProvider, public storage: Storage, public events: Events, private chRef: ChangeDetectorRef) {
        this.storage.get('token').then(
      result=>{
        this.token = result;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCustomerPage');
  }

  myBackButton() {
    this.navCtrl.pop();
  }

  getCustomerList(ev) {
    var val = ev.target.value;
    console.log("target value", val);
    clearTimeout(this.clearTimeout);
    this.clearTimeout = setTimeout(() => {
      this.getCustomersFunction(this.token, val);
    }, 500);

  }

  getCustomersFunction(token, name){
    console.log("getCustomersFunction call");
    this.service.getCustomers(token, name).subscribe(
      data=>{
        this.customerData = data;
        this.customerData=this.customerData.Data;
        console.log("customer", data);
        this.customers = [];
        if(this.customerData != null) {
          for(var i=0; i<this.customerData.length;i++) {
            this.customers.push(this.customerData[i])
          }
        }
        console.log("this.customer", this.customers);
        this.chRef.detectChanges();

      },
      error=>{
        console.log('error',error);
      }
    );
  }

  selectCustomer(customer) {
    console.log('select customer',customer);
    this.events.publish('selected_customer', customer);
    this.storage.set('selected_customer', customer);
    this.navCtrl.pop();
  }

  addCustomerButton() {
    this.navCtrl.push(AddNewCustomerPage,{},{animate:true,animation:'transition',duration:500,direction:'forward'});
  }


}
