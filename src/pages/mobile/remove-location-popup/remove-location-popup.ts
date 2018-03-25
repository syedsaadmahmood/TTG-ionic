import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the RemoveLocationPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-remove-location-popup',
  templateUrl: 'remove-location-popup.html',
})
export class RemoveLocationPopupPage {
  token:any;
  index:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemoveLocationPopupPage');
  }

  confirmOption() {
    this.events.publish('remove:location', true);
    this.viewCtrl.dismiss();
  }

  cancelOption() {
    this.events.publish('remove:location', false);
    this.viewCtrl.dismiss();
  }


}
