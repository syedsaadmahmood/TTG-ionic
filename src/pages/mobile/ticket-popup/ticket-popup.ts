import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams, ViewController, App} from 'ionic-angular';

import { AddTicketPage } from '../add-ticket/add-ticket';
import {Storage} from "@ionic/storage";

/**
 * Generated class for the TicketPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ticket-popup',
  templateUrl: 'ticket-popup.html',
})
export class TicketPopupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public viewCtrl: ViewController,public events: Events, public appCtrl: App) {
  }

  navigationToAddTicket() {
    // this.viewCtrl.dismiss();
    // console.log("navigationToAddTicket publish");
    // this.events.publish('navigationToAddTicket');

    // this.navCtrl.push(AddTicketPage,{},{animate:true,animation:'transition',duration:500,direction:'forward'});
    this.viewCtrl.dismiss();
    var array = [];
    this.storage.set("serviceItem", JSON.stringify(array));
    this.appCtrl.getRootNav().push(AddTicketPage);
  }

  // dismiss() {
  //   this.viewCtrl.dismiss();
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketPopupPage');
  }

}
