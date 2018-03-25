import {ChangeDetectorRef, Component} from '@angular/core';
import {Events, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ServicesProvider} from "../../../providers/services/services";
import {Storage} from "@ionic/storage";
import {QuotesPage} from "../quotes/quotes";

/**
 * Generated class for the AddNewCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-new-customer',
  templateUrl: 'add-new-customer.html',
})
export class AddNewCustomerPage {

  token:any;
  name:any;
  number:any;
  email:any;
  street1:any;
  street2:any;
  city:any;
  state:any;
  country:any;
  disabling:boolean;
  customerData:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private chRef: ChangeDetectorRef, private service: ServicesProvider, public storage: Storage, public loading: LoadingController, public events: Events) {
    this.disabling = true;

    this.storage.get('token').then(
    result=>{
      this.token = result;
      console.log('token',this.token);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewCustomerPage');
  }

  checkDisabling() {
    if(
      this.name!=undefined && this.name!="" && this.name!=null &&
      this.number!=undefined && this.number!="" && this.number!=null &&
      this.email!=undefined && this.email!="" && this.email!=null &&
      this.street1!=undefined && this.street1!="" && this.street1!=null &&
      this.city!=undefined && this.city!="" && this.city!=null &&
      this.state!=undefined && this.state!="" && this.state!=null &&
      this.country!=undefined && this.country!="" && this.country!=null
    ) {
      this.disabling = false;
      this.chRef.detectChanges();
    }
    else {
      this.disabling = true;
      this.chRef.detectChanges();
    }
  }

  addCompany() {
    this.street1 = this.street1 + this.street2;

     var body = {
       "contactName": this.name,
       "contactNumber": this.number,
       "contactEmail": this.email,
       "streetAddress": this.street1,
       "city": this.city,
       "state": this.state
     };

     let loading = this.loading.create({
      content: 'Please wait...'
    });
    loading.present();

    console.log("body", body);

    this.service.addCustomer(this.token, body).subscribe(
      data=>{
        console.log("response addCustomer", data);
        this.customerData  = data;
        this.customerData = this.customerData.Data;
        this.events.publish('new_customer', this.customerData);
        loading.dismiss();
        this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-3))
        },
      error=>{
        console.log('error',error);
        loading.dismiss();
      });

  }

}
