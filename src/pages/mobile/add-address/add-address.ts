import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddLocationPage} from "../add-location/add-location";

/**
 * Generated class for the AddAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google:any;

@Component({
  selector: 'page-add-address',
  templateUrl: 'add-address.html',
})
export class AddAddressPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAddressPage');
    this.inputAddress();
  }

  customBackButton() {
    this.navCtrl.pop();
  }

  inputAddress() {
    console.log('inputAddress');

    var input = document.getElementById('searchTextField');
    var context=this;

    var searchBox = new google.maps.places.Autocomplete(input);
    searchBox.addListener('place_changed', function() {

      console.log('place changed');
      var place = searchBox.getPlace();
      console.log('address', place);
      context.navCtrl.push(AddLocationPage,{"place": place},{animate:true,animation:'transition',duration:500,direction:'forward'});

    });
  }

}
