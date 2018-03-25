import {ChangeDetectorRef, Component} from '@angular/core';
import {Events, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";

/**
 * Generated class for the AddServiceRatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-service-rate',
  templateUrl: 'add-service-rate.html',
})
export class AddServiceRatePage {
  item:any;
  serviceItem=[];
  amount:any;
  clearTimeout:any;
  checkAmount = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private chRef: ChangeDetectorRef, public storage: Storage) {
    this.item = this.navParams.get('serviceItem');

    this.storage.get('serviceItemQuotes').then(
    result=>{
      console.log("get serviceItemQuotes", JSON.parse(result));
      if(result!=null)this.serviceItem = JSON.parse(result);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddServiceRatePage');
  }

  addServiceItem() {
    var obj = {service: this.item, ratePerHour: this.amount};
    if(this.checkObjectByName(this.serviceItem, obj) == false) {
        this.serviceItem.push(obj);
        this.storage.set('serviceItemQuotes', JSON.stringify(this.serviceItem));
        this.events.publish('search_item_quotes', this.serviceItem);
      }
      this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-3))
  }

  checkObjectByName(array, obj) {
    var value = false;
    for(var i=0; i<array.length; i++)
    {
      if(array[i].service.name == obj.service.name)
      {
        value = true;
        break;
      }
    }
    return value;
  }

  inputAmount() {
    // clearTimeout(this.clearTimeout);
    // this.clearTimeout = setTimeout(() => {
      if(this.amount!='' && this.amount!=undefined && this.amount!=null) {
        this.checkAmount = false;
        this.chRef.detectChanges();
      }
      else if(this.amount=='' || this.amount==undefined || this.amount==null) {
        this.checkAmount = true;
        this.chRef.detectChanges();
      }
    // }, 500);

  }


}
