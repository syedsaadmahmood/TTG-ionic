import { Component } from '@angular/core';
import {Events, IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the PriorityPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-priority-popup',
  templateUrl: 'priority-popup.html',
})
export class PriorityPopupPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PriorityPopupPage');
  }

  confirmOption() {
    this.events.publish('priority:status', true);
    this.viewCtrl.dismiss();
  }

  cancelOption() {
    this.events.publish('priority:status', false);
    this.viewCtrl.dismiss();
  }

}
