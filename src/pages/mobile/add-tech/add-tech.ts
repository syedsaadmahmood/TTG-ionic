import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {ServicesProvider} from "../../../providers/services/services";

/**
 * Generated class for the AddTechPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-tech',
  templateUrl: 'add-tech.html',
})
export class AddTechPage {
  clearTimeout:any;
  token:any;
  techData:any;
  techs=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public loading: LoadingController,private service: ServicesProvider, public storage: Storage, public events: Events) {
    this.storage.get('token').then(
      result=>{
        this.token = result;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTechPage');
  }

  myBackButton() {
    this.navCtrl.pop();
  }

  getTechList(ev) {
    var val = ev.target.value;
    console.log("target value", val);
    clearTimeout(this.clearTimeout);
    this.clearTimeout = setTimeout(() => {
      this.getTechsFunction(this.token, val);
    }, 500);

  }

  getTechsFunction(token, name){
    console.log("getTechsFunction call");
    this.service.getTechs(token, name).subscribe(
      data=>{
        this.techData = data;
        this.techData=this.techData.Data;
        console.log("tech", this.techData);
        this.techs = [];
        if(this.techData != null) {
          for(var i=0; i<this.techData.length;i++) {
            this.techs.push(this.techData[i])
          }
        }

      },
      error=>{
        console.log('error',error);
      }
    );
  }

  selectTech(tech) {
    console.log('select tech',tech);
    this.events.publish('selected_tech', tech);
    this.navCtrl.pop();
  }

}
