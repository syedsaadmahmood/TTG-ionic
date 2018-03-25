import {ChangeDetectorRef, Component} from '@angular/core';
import {Events, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {AddCustomerPage} from "../add-customer/add-customer";
import {Storage} from "@ionic/storage";
import {AddingServiceTicketPage} from "../adding-service-ticket/adding-service-ticket";
import {TicketDetailPage} from "../ticket-detail/ticket-detail";
import {ServicesProvider} from "../../../providers/services/services";
import {AddQuotePopupPage} from "../add-quote-popup/add-quote-popup";
import {TicketPopupPage} from "../ticket-popup/ticket-popup";

/**
 * Generated class for the AddQuotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-quotes',
  templateUrl: 'add-quotes.html',
})
export class AddQuotesPage {
  customerName:any;
  title:any;
  quoteSegment:any;
  monthyCap:any;
  searchItem = [];
  note:any;
  token:any;
  customer_id:any;
  disabling:boolean;
  isNewCustomer:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private chRef: ChangeDetectorRef, public storage: Storage, public loading: LoadingController, private service: ServicesProvider, public modalCtrl: ModalController) {
    this.disabling = true;
    this.customerName = "";
    this.quoteSegment = "hourly";
    this.isNewCustomer = false;

    this.events.subscribe('selected_customer', (data) => {
      if(data.last_name!=null) {
        this.customerName = data.first_name + " " + data.last_name;
      }
      else {
        this.customerName = data.first_name;
      }
      this.isNewCustomer = false;

       this.checkDisabling();
    });

    this.events.subscribe('new_customer', (data) => {
      this.customerName = data.contact_name;
      this.isNewCustomer = true;

       this.checkDisabling();
    });

    this.events.subscribe('search_item_quotes', (data) => {
       this.searchItem = data;
      console.log('searched item subscribe1', this.searchItem);
      this.checkDisabling();
    });

    this.storage.get('serviceItemQuotes').then(
    result=>{
      console.log("get serviceItemQuotes", JSON.parse(result));
      if(result!=null)this.searchItem = JSON.parse(result);
      this.checkDisabling();
    });

    this.storage.get('token').then(
    result=>{
      this.token = result;
      console.log('token',this.token);
    });

    this.storage.get('customer_id').then(
    result=>{
      this.customer_id = result;
      console.log('customer_id',this.customer_id);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddQuotesPage');
  }

  addCustomer(){
    this.navCtrl.push(AddCustomerPage,{},{animate:true,animation:'transition',duration:500,direction:'forward'});
  }

  tabChangeDetect(){
    this.chRef.detectChanges();
  }

  removeClicked(index) {
    this.searchItem.splice(index, 1);
    this.storage.set('serviceItemQuotes', JSON.stringify(this.searchItem));

    // this.searchItem = undefined;
    // this.events.publish('search_item', this.searchItem);
  }

  addService(){
    this.navCtrl.push(AddingServiceTicketPage,{quotes: true},{animate:true,animation:'transition',duration:500,direction:'forward'});
  }

  naivigateToPopup() {
    if(this.monthyCap == undefined) this.monthyCap=0;

    let modal = this.modalCtrl.create(AddQuotePopupPage,{
      "title": this.title,
      "customerId": this.customer_id,
      "note": this.note,
      "type": "string",
      "monthlyCap": this.monthyCap,
      "newCompany": this.isNewCustomer,
      "quoteItems": this.searchItem},{showBackdrop:true, enableBackdropDismiss:true});
    modal.present();


  }

  checkDisabling() {
    if(this.customerName!="" && this.note!=undefined && this.note!="" && this.note!=null && this.title!=undefined && this.title!="" && this.title!=null && this.searchItem.length!=0) {
      this.disabling = false;
      this.chRef.detectChanges();
    }
    else {
      this.disabling = true;
      this.chRef.detectChanges();
    }
  }

}
