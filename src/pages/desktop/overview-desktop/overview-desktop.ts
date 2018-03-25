import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {TabsPage} from "../../mobile/tabs/tabs";

/**
 * Generated class for the OverviewDesktopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-overview-desktop',
  templateUrl: 'overview-desktop.html',
})
export class OverviewDesktopPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public plt: Platform, public appCtrl: App) {

    if (this.plt.is('core')) {
      this.appCtrl.getRootNav().setRoot(OverviewDesktopPage);
    }
    else {
      this.appCtrl.getRootNav().setRoot(TabsPage);
      }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OverviewDesktopPage');
  }

}
