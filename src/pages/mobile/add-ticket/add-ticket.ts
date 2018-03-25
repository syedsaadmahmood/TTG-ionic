import { Component,ChangeDetectorRef } from '@angular/core';
import {
  NavController, NavParams, AlertController, Events, ModalController,
  LoadingController
} from 'ionic-angular';
import {AddingServiceTicketPage} from "../adding-service-ticket/adding-service-ticket";
import {CredentialsAddTicketPage} from "../credentials-add-ticket/credentials-add-ticket";
import {PriorityPopupPage} from "../priority-popup/priority-popup";
import {RecurringPopupPage} from "../recurring-popup/recurring-popup";
import {Storage} from "@ionic/storage";
import {AddressBookPage} from "../address-book/address-book";
import {ServicesProvider} from "../../../providers/services/services";
import {AddTechPage} from "../add-tech/add-tech";
import {AddCustomerPage} from "../add-customer/add-customer";

/**
 * Generated class for the AddTicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


declare var $:any;
declare var google:any;

@Component({
  selector: 'page-add-ticket',
  templateUrl: 'add-ticket.html',
})
export class AddTicketPage {
  addTicketSegment:any;
  headText=false;
  isToggled: boolean;
  isToggledRecurring: boolean;
  addCredentialOnsiteBtn = true;
  myDate: string = new Date().toISOString();
  // myTime: string = new Date().toISOString();
  isSubscribed: boolean;
  isSubscribedRecurring: boolean;
  searchItem = [];
  recurringValue: any;
  description:any="";
  credentials:any="";
  token:any;
  address:any;
  place:any;
  persona:any;
  customerName:any;
  techName:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public events: Events,private chRef: ChangeDetectorRef, public modalCtrl: ModalController,private service: ServicesProvider,public storage: Storage, public loading: LoadingController) {
    this.isToggled = false;
    this.isToggledRecurring = false;
    this.addTicketSegment= "Remote";
    this.isSubscribed = false;
    this.isSubscribedRecurring = false;
    this.address="";
    this.credentials="";
    this.description="";
    this.customerName="";
    this.techName="";

    this.storage.get('token').then(
        result=>{
          this.token = result;
          console.log('token',this.token);
        }
      );

    this.storage.get('serviceItem').then(
    result=>{
      console.log("get serviceItem", JSON.parse(result));
      if(result!=null)this.searchItem = JSON.parse(result);
    });


    this.events.subscribe('priority:status', (status) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      // console.log('Welcome', user, 'at', time);
      this.isToggled = status;
      this.isSubscribed = true;
      console.log('priority:status subscribe', this.isToggled);
    });

     this.events.subscribe('recurring:status', (data) => {
       this.isToggledRecurring = data.status;
       this.isSubscribedRecurring = true;
       this.recurringValue = data.status_value;
      console.log('recurring:status subscribe', status);
    });

     this.events.subscribe('search_item', (data) => {
       this.searchItem = data;
       this.addCredentialOnsiteBtn = false;
      console.log('searched item subscribe', this.searchItem);
    });

     this.events.subscribe('selectedPlace', (data) => {
       console.log('address selectedPlace subscribe', data);
       this.address = data.street_address;
       this.place = data;
    });

     this.events.subscribe('chosen_place', (data) => {
       this.address = data.name;
       this.place = data;
      console.log('address chosen_place subscribe', data.name);
    });

     this.storage.get('persona').then(
       result=>{
         this.persona = result;
         console.log('persona',this.persona);
        }
      );

     this.events.subscribe('selected_customer', (data) => {
       this.customerName = data.first_name + " " + data.last_name;
       this.addCredentialOnsiteBtn = false;
    });

     this.events.subscribe('selected_tech', (data) => {
       this.techName = data.first_name + " " + data.last_name;
    });

  }


  addServiceRemote(){
    this.navCtrl.push(AddingServiceTicketPage,{},{animate:true,animation:'transition',duration:500,direction:'forward'});
  }

  addCustomer(){
    this.navCtrl.push(AddCustomerPage,{},{animate:true,animation:'transition',duration:500,direction:'forward'});
  }

  addTech(){
    this.navCtrl.push(AddTechPage,{},{animate:true,animation:'transition',duration:500,direction:'forward'});
  }

  addcredentialRemote(){
    // console.log("before", this.myDate);
    // this.myDate = this.myDate + this.myTime;
    // console.log("after", this.myDate);
    this.navCtrl.push(CredentialsAddTicketPage,{
      "type": this.addTicketSegment,
        "place": this.place,
        "searchItems": this.searchItem,
        "dateTime": this.myDate,
        "urgent": this.isToggled,
        "recurring": this.recurringValue,
        "recurringToggle": this.isToggledRecurring,
      }
    ,{animate:true,animation:'transition',duration:500,direction:'forward'});
  }

  tabChangeDetect(){
    this.chRef.detectChanges();
  }


  checkSelectedtab(){
  if(this.addTicketSegment=='Remote'){
      this.headText=false;
    }else{
      this.headText=true;
    }
  }


  NotUrgentRemote() {
    if(this.isSubscribed==false){
      let modal = this.modalCtrl.create(PriorityPopupPage,{}, {enableBackdropDismiss: false});
      modal.present();
    }
    this.isSubscribed=false;
  }

  RequestRecurringRemote() {
    if(this.isSubscribedRecurring==false){
      let modal = this.modalCtrl.create(RecurringPopupPage,{}, {enableBackdropDismiss: false});
      modal.present();
    }
    this.isSubscribedRecurring=false;
    if(this.recurringValue!=undefined) {
      this.recurringValue=undefined
    }
  }


  ionViewDidLoad() {

  }

  crossClicked(index) {
    this.searchItem.splice(index, 1);
    this.storage.set('serviceItem', JSON.stringify(this.searchItem));

    // this.searchItem = undefined;
    // this.events.publish('search_item', this.searchItem);
  }


  addressClicked() {
    this.navCtrl.push(AddressBookPage,{},{animate:true,animation:'transition', duration:500, direction:'forward'});
  }

}
