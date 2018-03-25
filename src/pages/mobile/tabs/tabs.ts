import {Component, ChangeDetectorRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';
import { TicketsPage } from '../tickets/tickets';
import { QuotesPage } from '../quotes/quotes';
import { SchedulesPage } from '../schedules/schedules';
import { FinancesPage } from '../finances/finances';
import {Storage} from "@ionic/storage";
import {UsersPage} from "../users/users";
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  // @ViewChild('myTabs') tabRef: Tabs;
  schedule: any;
  users: any;
  tickets: any;
  finances:any;
  quotes:any;
  authenticated=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private chRef: ChangeDetectorRef, public storage: Storage,) {
    this.schedule = SchedulesPage;
    this.users = UsersPage;
    this.tickets = TicketsPage;
    this.finances = FinancesPage;
    this.quotes = QuotesPage;

        this.storage.get('isAuthenticated').then(
      result=>{
        if(result==true){
          console.log("in auth chk",result);
          this.authenticated=true;
        }
        else {
          this.authenticated=false;
        }
      }
    )

  }

  tabChangeDetect(){
    this.chRef.detectChanges();

  }

  ionViewDidLoad() {
    this.chRef.detectChanges();
  }

 //  ionViewDidEnter() {
 //  this.tabRef.select(2);
 // }

}
