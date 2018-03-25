import { Component,ViewChild,ChangeDetectorRef } from '@angular/core';
import {
  IonicPage, NavController, NavParams, Navbar, Nav, LoadingController, App, Events,
  ModalController
} from 'ionic-angular';

import { Storage } from '@ionic/storage';
import {PriorityPopupPage} from "../priority-popup/priority-popup";
import {RecurringPopupPage} from "../recurring-popup/recurring-popup";
import {CancelTicketPopupPage} from "../cancel-ticket-popup/cancel-ticket-popup";
import {TabsPage} from "../tabs/tabs";
import {ServicesProvider} from "../../../providers/services/services";

/**
 * Generated class for the TicketDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ticket-detail',
  templateUrl: 'ticket-detail.html',
})
export class TicketDetailPage {
  myDate: String = new Date().toISOString();
  isToggled: boolean;
  isToggledRecurring: boolean;
  isSubscribed: boolean;
  isSubscribedRecurring: boolean;
  recurringValue: any;
  token:any;
  ticketId:any;
  ticketNo;any;
  segment: string = "overview";
  userDp:any = "https://www.library.caltech.edu/sites/default/files/styles/headshot/public/default_images/user.png?itok=1HlTtL2d";
  refreshDP:any = "https://cdn-images-1.medium.com/max/512/1*wlD746MhnqBRB6RPUtx8Gg.png";
  description:any;
  credentials:any;
  cross:boolean;
  ticketData:any;
  status:any;
  name:any;
  persona:any;
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,public loading: LoadingController,private service: ServicesProvider,private chRef: ChangeDetectorRef, public appCtrl: App,public events: Events, public modalCtrl: ModalController) {
    this.ticketId=this.navParams.get('id');
    this.description=this.navParams.get('description');
    this.credentials=this.navParams.get('credentials');
    this.cross=this.navParams.get('cross');
    this.status = "Pending";
    this.isToggled = false;
    this.isToggledRecurring = false;
    this.isSubscribed = false;
    this.isSubscribedRecurring = false;
    if(this.navParams.get('myDate')!=undefined){
      this.myDate = this.navParams.get('myDate');
    }

    this.isToggled=this.navParams.get('isToggled');
    this.recurringValue=this.navParams.get('recurringValue');
    this.isToggledRecurring = this.navParams.get('recurringToggle');
    if(this.isToggledRecurring==true) {
      this.isSubscribedRecurring = true;
    }

    this.storage.get('token').then(
      result=>{
        this.token = result;
        this.getTicketDetailFunction(this.token,this.ticketId)

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
      console.log('recurring:status subscribe', data.status);
    });

     this.storage.get('persona').then(
        result=>{
          this.persona = result;
          console.log('persona detail',this.persona);
        }
      );

  }

  tabChangeDetect(){
    this.chRef.detectChanges();

  }

  getTicketDetailFunction(token,id){
    let loading = this.loading.create({
      content: 'Please wait...'
    });
    loading.present();
    this.service.getTicketDetail(token,id).subscribe(
      data=>{
        console.log('get ticket detail data',data);
        loading.dismiss();
        this.ticketData = data;
        this.ticketData = this.ticketData.Data[0];
        this.ticketNo = this.ticketData.id;
        this.description = this.ticketData.description;
        this.status = this.ticketData.status;
        console.log("status", this.status);
        if(this.status=="Assigned") {
          var arrayGuru = this.ticketData.guru;

        for(var i=0;i<arrayGuru.length;i++)
        {
          if(arrayGuru[i].status=="Assigned" || arrayGuru[i].status=="OnTheWay")
          {
            this.name = arrayGuru[i].guru.first_name;
          }
        }
        }



        console.log('gdescription',this.description);
      },
      error=>{
        console.log('error',error);
        loading.dismiss();
      }
    );
  }

  ionViewDidLoad() {

  }

  closeButton() {
    // this.appCtrl.getRootNav().setRoot(TabsPage);
    // console.log("nav length", this.navCtrl.length());
    // this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-3))

    this.navCtrl.setRoot(TabsPage);
    // this.navCtrl.popToRoot();
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

  cancelClicked() {
    let modal = this.modalCtrl.create(CancelTicketPopupPage,{"request_id": this.ticketId},{showBackdrop:true, enableBackdropDismiss:true});
    modal.present();
  }



}
