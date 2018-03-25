import {ChangeDetectorRef, Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  update: {first_name?: string, last_name?: string, image?:String} = {};
  profileSegment: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private chRef: ChangeDetectorRef) {
    this.update.image =  "https://www.library.caltech.edu/sites/default/files/styles/headshot/public/default_images/user.png?itok=1HlTtL2d";
    this.profileSegment = "skills";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  tabChangeDetect() {
    this.chRef.detectChanges();
  }

  addNewSkill() {

  }

  openGallery() {

  }


}
