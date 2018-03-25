import {ChangeDetectorRef, Component} from '@angular/core';
import {Events, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {ServicesProvider} from "../../../providers/services/services";
import {AddServiceRatePage} from "../add-service-rate/add-service-rate";

/**
 * Generated class for the AddingServiceTicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-adding-service-ticket',
  templateUrl: 'adding-service-ticket.html',
})
export class AddingServiceTicketPage {

  serviceItem=[];
  token:any;
  items=[];
  storeItems=[];
  temp:any;
  checkQuote:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,public loading: LoadingController,private service: ServicesProvider,public events: Events,private chRef: ChangeDetectorRef) {
    this.storage.get('token').then(
      result=>{
        this.token = result;
        this.getServiceFunction(this.token);
      });

    this.checkQuote = this.navParams.get('quotes');

    this.storage.get('serviceItem').then(
    result=>{
      console.log("get serviceItem", JSON.parse(result));
      if(result!=null)this.serviceItem = JSON.parse(result);
    });
  }

  getServiceItem(obj){
    // console.log("searched item: ", this.items[index]);

    if(this.checkQuote!=true)
    {
      if(this.checkObjectById(this.serviceItem, obj) == false) {
        this.serviceItem.push(obj);
        console.log("this.serviceItem", this.serviceItem);
        this.storage.set('serviceItem', JSON.stringify(this.serviceItem));
        this.events.publish('search_item', this.serviceItem);
      }
      this.navCtrl.pop();
    }

    else if(this.checkQuote==true) {
      this.navCtrl.push(AddServiceRatePage,{serviceItem: obj},{animate:true,animation:'transition',duration:500,direction:'forward'});
    }

  }


  getServiceFunction(token){
    let loading = this.loading.create({
      content: 'Please wait...'
    });
    loading.present();
    this.service.getService(token).subscribe(
      data=>{
        this.temp = data;
        this.temp=this.temp.Data;
        for(var i=0; i<this.temp.length;i++)
        {
          this.items.push(this.temp[i]);
          // this.allServices.push(this.temp[i]);
        }
        this.storeItems=this.items;
        // this.storage.set("all_services", JSON.stringify(this.allServices));

        console.log('data items',this.temp);
        loading.dismiss();

      },
      error=>{
        console.log('error',error);
        loading.dismiss();
      }
    );
  }

  getItems(ev) {
    this.chRef.detectChanges();
    this.items=this.storeItems;
    console.log('service items',this.items);

    // set val to the value of the ev target
    var val = ev.target.value;
    console.log("target value", val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  ionViewDidLoad() {
    // this.chRef.detectChanges();
  }

  myBackButton() {
    this.navCtrl.pop();
  }

  checkObjectById(array, obj) {
    var value = false;
    for(var i=0; i<array.length; i++)
    {
      if(array[i].id == obj.id)
      {
        value = true;
        break;
      }
    }
    return value;
  }

}
