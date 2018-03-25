import { Component,ViewChild,ChangeDetectorRef } from '@angular/core';
import {Platform, AlertController, Events, Nav, LoadingController, App, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { ServicesProvider } from '../providers/services/services';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import {LoginPage} from "../pages/common/login/login";
import {SettingsPage} from "../pages/mobile/settings/settings";
import {QuotesPage} from "../pages/mobile/quotes/quotes";
import {UsersPage} from "../pages/mobile/users/users";
import {OverviewDesktopPage} from "../pages/desktop/overview-desktop/overview-desktop";
import {TicketsDesktopPage} from "../pages/desktop/tickets-desktop/tickets-desktop";
import {FinancesDesktopPage} from "../pages/desktop/finances-desktop/finances-desktop";
import {ProfilePage} from "../pages/mobile/profile/profile";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  platform: any;
  companyName: any;
  userName: any;
  rootPage:any;
  authenticated=false;
  alert:any;
  userDp:any = "https://www.library.caltech.edu/sites/default/files/styles/headshot/public/default_images/user.png?itok=1HlTtL2d";
  selectedPage:any;
  @ViewChild(Nav) nav: Nav;

  constructor(
    public plt: Platform,
    splashScreen: SplashScreen,
    public storage: Storage,
    public events: Events,
    public alertCtrl: AlertController,
    private service: ServicesProvider,
    private auth: AuthenticationProvider,
    public loading: LoadingController,
    private chRef: ChangeDetectorRef,
    public app:App,
    private statusBar: StatusBar,
    public menu: MenuController
  ) {
    this.selectedPage = "Overview";
    console.log("selectedPage: ",this.selectedPage);

    plt.ready().then(() => {
      splashScreen.hide();

      // this.statusBar.backgroundColorByHexString('#4d4d4d');
      if (plt.is('core')) {
        this.platform = "desktop";
        console.log('platform', 'desktop');
      }
      else {
        this.platform = "mobile";
        console.log('platform', 'mobile');
      }

      // statusBar.styleDefault();
      this.statusBar.styleLightContent();

      //
      // platform.registerBackButtonAction(() => {
      //   // let nav = this.app.getActiveNav();
      //
      //   if(this.nav.canGoBack()){
      //     this.nav.pop();
      //   }else{
      //     if(this.alert){
      //       this.alert.dismiss();
      //       this.alert =null;
      //     }else{
      //       this.showAlert();
      //     }
      //   }
      // },1);

    });


    events.subscribe('user:canRun', (run) => {

      if(run==true){
        this.storage.get('profile').then(
          result=>{
            // this.profile=result;
            // console.log('profile in nav', this.profile);
          }
        )
      }
      setTimeout(()=>{
        this.authenticated=run;
      },500);
      console.log('event received',run);
    });
    this.storage.get('isAuthenticated').then(
      result=>{
        if(result==true){
          console.log("in auth chk",result);
          this.authenticated=true;
          this.rootPage=OverviewDesktopPage;

        }
        else {
          this.authenticated=false;
          this.rootPage=LoginPage;
        }
      }
    );

    this.events.subscribe('companyName&UserName', (data) => {
      this.companyName = data.companyName;
      this.userName = data.userName;
      console.log('companyName&UserName subscribe', data);
    });

  }


  changeDetect(){
    this.chRef.detectChanges();

  }

  // presentLoadingDefault() {
  //   let loading = this.loading.create({
  //     content: 'Please wait...'
  //   });
  //
  //   loading.present();
  //
  //   setTimeout(() => {
  //     loading.dismiss();
  //   }, 500);
  // }

  // logoutOption(){
  //   this.presentLoadingDefault();
  //   this.storage.set('isAuthenticated',false);
  //   this.authenticated=false;
  //   this.storage.set('token','');
  //   this.events.publish('user:canRun', false);
  //   // this.rootPage=LoginPage;
  //   this.menu.enable(false);
  //   this.nav.setRoot(LoginPage);
  //
  // }

  ionViewDidLoad() {
    this.chRef.detectChanges();
  }


  showAlert() {
    this.alert = this.alertCtrl.create({
      // title: 'Exit?',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.alert =null;
          }
        },
        {
          text: 'Exit',
          handler: () => {
            this.plt.exitApp();
          }
        }
      ]
    });
    this.alert.present();
  }

  settingsButton()
  {
    this.menu.close();
    this.nav.push(SettingsPage);
  }

  overviewPage(select) {
    this.selectedPage = select;
    this.rootPage = OverviewDesktopPage;
  }

  requestPage(select) {
    this.selectedPage = select;
    this.rootPage = TicketsDesktopPage;
  }

  invoicesPage(select) {
    this.selectedPage = select;
    this.rootPage = FinancesDesktopPage;
  }

  quotesPage(select) {
    this.selectedPage = select;
    this.rootPage = QuotesPage;
  }

  usersPage(select) {
    this.selectedPage = select;
    this.rootPage = UsersPage;
  }

  settingsPage() {
    this.nav.push(SettingsPage);
  }

  navigateProfilePage() {
    this.menu.close();
    this.nav.push(ProfilePage);
  }



}

