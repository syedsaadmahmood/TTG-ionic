import {ChangeDetectorRef, Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AccountDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-account-details',
  templateUrl: 'account-details.html',
})
export class AccountDetailsPage {

  accountSegment:any;
  contact:any;
  token:any;
  name:any;
  number:any;
  email:any;
  street1:any;
  street2:any;
  city:any;
  state:any;
  country:any;
  disabling:any;
  expiry: string;
  fullName:any;
  cardNumber:any;
  cvv:any;
  zipCode:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private chRef: ChangeDetectorRef) {
    this.accountSegment = 'general';
    this.contact = 'Norman';
    this.disabling = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountDetailsPage');
  }

  tabChangeDetect(){
    this.chRef.detectChanges();
  }

  updateInfo() {

  }

  checkDisabling() {
    console.log("expiry", this.expiry);
    console.log("fullName", this.fullName);
    console.log("cardNumber", this.cardNumber);
    console.log("cvv", this.cvv);
    console.log("zipCode",this.zipCode);
    if(
      this.expiry!=undefined && this.expiry!="" && this.expiry!=null &&
      this.fullName!=undefined && this.fullName!="" && this.fullName!=null &&
      this.cardNumber!=undefined && this.cardNumber!="" && this.cardNumber!=null &&
      this.cvv!=undefined && this.cvv!="" && this.cvv!=null &&
      this.zipCode!=undefined && this.zipCode!="" && this.zipCode!=null
    ) {
      this.disabling = false;
      this.chRef.detectChanges();
    }
    else {
      this.disabling = true;
      this.chRef.detectChanges();
    }
  }

}
