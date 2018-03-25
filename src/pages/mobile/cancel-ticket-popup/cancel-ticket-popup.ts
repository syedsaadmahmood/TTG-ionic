import { Component } from '@angular/core';
import {App, Events, IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {TabsPage} from "../tabs/tabs";
import {ServicesProvider} from "../../../providers/services/services";

/**
 * Generated class for the CancelTicketPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cancel-ticket-popup',
  templateUrl: 'cancel-ticket-popup.html',
})
export class CancelTicketPopupPage {
  token:any;
  ticketId:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public viewCtrl: ViewController, public loading: LoadingController,private service: ServicesProvider, public storage: Storage, public appCtrl: App) {
    this.storage.get('token').then(
      result=>{
        this.token = result;
      });

    this.ticketId=this.navParams.get('request_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CancelTicketPopupPage');
  }

  cancelItOption() {
    // this.events.publish('cancel:request', true);
    this.cancelTicket();
    this.viewCtrl.dismiss();
  }

  keepItOption() {
    // this.events.publish('cancel:request', false)
    this.viewCtrl.dismiss();
  }

  cancelTicket() {
    var body = {
      "request_id": this.ticketId,
      "status": "Cancel",
      "favoritesOnly": true,
      "createTicket": true
    };

     let loading = this.loading.create({
      content: 'Please wait...'
    });
    loading.present();

    this.service.updateTicket(this.token, body).subscribe(
      data=>{
        console.log("response updateTicket", data);
        loading.dismiss();
        // this.events.publish('remove:ticket', {"request_id": this.ticketId});
        // this.navCtrl.popToRoot();
         this.appCtrl.getRootNav().push(TabsPage);
        },
      error=>{
        console.log('error',error);
        loading.dismiss();
      }
    );

  }


}
