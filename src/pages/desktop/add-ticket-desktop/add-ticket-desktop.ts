import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddTicketDesktopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-ticket-desktop',
  templateUrl: 'add-ticket-desktop.html',
})
export class AddTicketDesktopPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTicketDesktopPage');
  }

  addTicketBackButton() {
    this.navCtrl.pop();
  }

}
