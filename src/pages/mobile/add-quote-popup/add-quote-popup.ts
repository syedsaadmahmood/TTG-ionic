import { Component } from '@angular/core';
import {Events, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {ServicesProvider} from "../../../providers/services/services";
import {Storage} from "@ionic/storage";
import {TabsPage} from "../tabs/tabs";
import {QuotesPage} from "../quotes/quotes";

/**
 * Generated class for the AddQuotePopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-quote-popup',
  templateUrl: 'add-quote-popup.html',
})
export class AddQuotePopupPage {
  title:any;
  customerId:any;
  note:any;
  type:any;
  monthlyCap:any;
  newCompany:any;
  quoteItems = [];
  token:any;
  customerName:any;
  email:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController, private service: ServicesProvider, public storage: Storage, public events: Events, public viewCtrl: ViewController) {

    this.storage.get('token').then(
        result=>{
          this.token = result;
          console.log('token',this.token);
        });

    this.storage.get('selected_customer').then(
      result=>{
        this.customerName = result.first_name + " " + result.last_name;
        this.email = result.email;
      });


    this.title = this.navParams.get('title');
    this.customerId = this.navParams.get('customerId');
    this.note = this.navParams.get('note');
    this.type = this.navParams.get('type');
    this.monthlyCap = this.navParams.get('monthlyCap');
    this.newCompany = this.navParams.get('newCompany');
    this.quoteItems = this.navParams.get('quoteItems');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddQuotePopupPage');
  }

  cancelQuote() {
    this.viewCtrl.dismiss();
  }

  sendQuote() {
    this.addSingleQuote();
  }

  addSingleQuote() {
     var body = {
       "title": this.title,
       "customerId": this.customerId,
       "note": this.note,
       "type": this.type,
       "monthlyCap": this.monthlyCap,
       "newCompany": this.newCompany,
       "quoteItems": this.quoteItems
     };

     let loading = this.loading.create({
      content: 'Please wait...'
    });
    loading.present();

    console.log("body", body);

    this.service.addQuote(this.token, body).subscribe(
      data=>{
        console.log("response addQuote", data);
        // this.ticketsData  = data;
        // this.ticketsData = this.ticketsData.Data;
        loading.dismiss();
        this.navCtrl.setRoot(QuotesPage);
        },
      error=>{
        console.log('error',error);
        loading.dismiss();
      });

  }

}
