import { Component,ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams,Refresher,ToastController } from 'ionic-angular';
/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  segment: any;
  userDp:any = "https://www.library.caltech.edu/sites/default/files/styles/headshot/public/default_images/user.png?itok=1HlTtL2d";

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,private chRef: ChangeDetectorRef) {
    this.segment= "open";
  }

  tabChangeDetect(){
    this.chRef.detectChanges();

  }


  doRefresh(refresher: Refresher) {
    setTimeout(() => {
      refresher.complete();

      const toast = this.toastCtrl.create({
        message: 'Users have been updated.',
        duration: 3000
      });
      toast.present();
    }, 1000);
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

}

