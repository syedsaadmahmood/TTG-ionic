import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, MenuController, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {AddressBookPage} from "../address-book/address-book";
import {LoginPage} from "../../common/login/login";
import {AccountDetailsPage} from "../account-details/account-details";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  persona:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public events: Events, public menu: MenuController, public loading: LoadingController) {
    this.storage.get('persona').then(
    result=>{
      this.persona = result;
      console.log('persona ticket',this.persona);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  logoutOption(){
    this.presentLoadingDefault();
    this.storage.set('isAuthenticated',false);
    this.storage.set('token','');
    this.events.publish('user:canRun', false);
    this.menu.enable(false);
    this.navCtrl.setRoot(LoginPage);

  }

  presentLoadingDefault() {
    let loading = this.loading.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 500);
  }

  AddressBook() {
    this.navCtrl.push(AddressBookPage);
  }

  navigateAccountDetailsPage() {
    this.navCtrl.push(AccountDetailsPage);
  }

}
