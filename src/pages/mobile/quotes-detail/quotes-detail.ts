import { Component } from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {AcceptQuotePopupPage} from "../accept-quote-popup/accept-quote-popup";
import {DeclineQuotePopupPage} from "../decline-quote-popup/decline-quote-popup";

/**
 * Generated class for the QuotesDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-quotes-detail',
  templateUrl: 'quotes-detail.html',
})
export class QuotesDetailPage {
  userDp:any = "https://www.library.caltech.edu/sites/default/files/styles/headshot/public/default_images/user.png?itok=1HlTtL2d";
  quote:any;
  quoteDate: any;
  quoteSentOn:any;
  quoteItems = [];
  persona:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public modalCtrl: ModalController) {

    this.storage.get('persona').then(
       result=>{
         this.persona = result;
         console.log('persona',this.persona);
        }
      );

    this.quote = this.navParams.get('quote');
    console.log("quote detail", this.quote);
    this.quoteDate = this.quote.date;
    this.quoteSentOn = this.quote.sentOn;
    this.getServices();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuotesDetailPage');
  }

  getServices() {

    var itemList = this.quote.quoteItems;
    for(var i=0; i<itemList.length; i++) {
      this.quoteItems.push(itemList[i]);
    }
    console.log("quoteItems", this.quoteItems);
  }

  acceptQuote() {
    let modal = this.modalCtrl.create(AcceptQuotePopupPage,{},{showBackdrop:true, enableBackdropDismiss:true});
    modal.present();
  }

  declineQuote() {
    let modal = this.modalCtrl.create(DeclineQuotePopupPage,{},{showBackdrop:true, enableBackdropDismiss:true});
    modal.present();
  }

}
