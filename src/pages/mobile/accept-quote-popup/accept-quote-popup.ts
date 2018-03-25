import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AcceptQuotePopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-accept-quote-popup',
  templateUrl: 'accept-quote-popup.html',
})
export class AcceptQuotePopupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcceptQuotePopupPage');
  }

  cancelOption() {

  }

  confirmOption() {

  }

}
