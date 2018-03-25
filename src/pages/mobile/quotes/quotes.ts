import {ChangeDetectorRef, Component} from '@angular/core';
import {
  App,
  Events, LoadingController, MenuController, NavController, NavParams, Refresher,
  ToastController
} from 'ionic-angular';

import { QuotesDetailPage } from '../quotes-detail/quotes-detail';
import {Storage} from "@ionic/storage";
import {AddQuotesPage} from "../add-quotes/add-quotes";
import {ServicesProvider} from "../../../providers/services/services";
import {LoginPage} from "../../common/login/login";
/**
 * Generated class for the QuotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage {
  persona: any;
  userDp:any = "https://www.library.caltech.edu/sites/default/files/styles/headshot/public/default_images/user.png?itok=1HlTtL2d";
  caseSelect:any;
  token:any;
  acceptedQuotes=[];
  pendingQuotes=[];
  quoteData:any;
  refreshData:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public storage: Storage, public loading: LoadingController, private chRef: ChangeDetectorRef, private service: ServicesProvider, public events: Events, public menu: MenuController, public app:App) {

    this.caseSelect = 'accepted';

    this.storage.get('persona').then(
       result=>{
         this.persona = result;
         console.log('persona',this.persona);
        }
      );

    this.storage.get('token').then(
        result=>{
          this.token = result;
          console.log('token',this.token);
          this.getListQuotes();
        });

  }

  SelectCase(select) {
    this.caseSelect = select;
    this.chRef.detectChanges();
  }

  navigationToQuotesDetail(quote) {
    this.navCtrl.push(QuotesDetailPage,{"quote": quote},{animate:true,animation:'transition',duration:500,direction:'forward'});
  }

  addQuotePage(){
    this.navCtrl.push(AddQuotesPage,{},{animate:true,animation:'transition',duration:500,direction:'forward'});
  }

  doRefresh(refresher: Refresher) {
    setTimeout(() => {
      this.refreshData=true;
        this.getListQuotes();
        refresher.complete();
      }, 1000);
    };

  getListQuotes() {
    let loading = this.loading.create({
      content: 'Please wait...'
    });
    loading.present();

    this.service.getQuotes(this.token).subscribe(
      data=>{
        console.log("response getQuote", data);
        this.quoteData  = data;
        this.quoteData = this.quoteData.Data;

        if(this.quoteData.length !=0 && this.quoteData != null) {
          for(var i=0; i<this.quoteData.length; i++) {
            if(this.quoteData[i].status == 'Accepted') {
              if(this.checkObjectById(this.acceptedQuotes, this.quoteData[i]) == false) {
                this.acceptedQuotes.push(this.quoteData[i]);
              }
            }
            else if(this.quoteData[i].status == 'Pending') {
              if(this.checkObjectById(this.pendingQuotes, this.quoteData[i]) == false) {
                this.pendingQuotes.push(this.quoteData[i]);
              }
            }
          }
        }


        if (this.refreshData == true) {
          const toast = this.toastCtrl.create({
            message: 'Quotes have been updated.',
            duration: 3000
          });
          toast.present();
        }
        loading.dismiss();

        },
      error=>{
        console.log('error',error);
        loading.dismiss();
        if(error.statusText == 'Unauthorized')
        {
          this.logoutOption();
        }
      });

  }

  checkObjectById(array, obj) {
    var value = false;
    for(var i=0; i<array.length; i++)
    {
      if(array[i].id == obj.id)
      {
        value = true;
        break;
      }
    }
    return value;
  }

  logoutOption(){
    this.presentLoadingDefault();
    this.storage.set('isAuthenticated',false);
    this.storage.set('token','');
    this.events.publish('user:canRun', false);
    this.menu.enable(false);
    this.app.getRootNav().push(LoginPage);
  }

  presentLoadingDefault() {
    let loading = this.loading.create({
      content: 'Logging Out'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad QuotesPage');
  }

}
