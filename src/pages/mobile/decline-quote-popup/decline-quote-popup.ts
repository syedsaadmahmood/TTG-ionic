import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DeclineQuotePopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-decline-quote-popup',
  templateUrl: 'decline-quote-popup.html',
})
export class DeclineQuotePopupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeclineQuotePopupPage');
  }

  cancelOption() {

  }

  confirmOption() {

  }

}
