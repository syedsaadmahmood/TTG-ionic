import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the RecurringPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-recurring-popup',
  templateUrl: 'recurring-popup.html',
})
export class RecurringPopupPage {
  mode_status: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public viewCtrl: ViewController) {
    this.mode_status = 'weekly'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecurringPopupPage');
  }

    cancelClick() {
    this.events.publish('recurring:status', {status: true, status_value: this.mode_status});
    this.viewCtrl.dismiss();
  }

  isPrimary(stored) {

    if(this.mode_status==stored) return true;
    else return false;

  }

  setPrimary(stored) {
    this.mode_status=stored;
  }

}
