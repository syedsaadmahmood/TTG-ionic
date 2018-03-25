import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {AddAddressPage} from "../add-address/add-address";
import { Storage } from '@ionic/storage';
import {RemoveLocationPopupPage} from "../remove-location-popup/remove-location-popup";
import {ServicesProvider} from "../../../providers/services/services";

/**
 * Generated class for the AddressBookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-address-book',
  templateUrl: 'address-book.html',
})
export class AddressBookPage {
  locations: any;
  selectedIndex:any;
  place:any;
  removeOption:boolean;
  token:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public storage: Storage, private service: ServicesProvider, public loading: LoadingController, public modalCtrl: ModalController) {
    this.locations = [];
    // this.selectedIndex = 0;
    this.removeOption = false;

    this.storage.get('token').then(
      result=>{
        this.token = result;
        // this.GetLocations(this.token);
      });

    // this.events.subscribe('chosen_place', (data) => {
    //    this.place = data;
    //    this.GetLocations(this.token);
    //    // this.calculateLocation();
    //    // this.AddLocation(this.token);
    //    // this.locations.push(this.place);
    //    // this.selectedIndex = this.locations.length - 1;
    //    // this.storage.set('selectedIndex', this.selectedIndex);
    //    // storage.set('places_location', JSON.stringify(this.locations));
    // });

    //  storage.get('places_location').then(
    // result=>{
    //   console.log("get places_array", JSON.parse(result));
    //   if(result!=null)this.locations = JSON.parse(result);
    // });
    //
    //  storage.get('selectedIndex').then(
    // result=>{
    //   console.log("this.selectedIndex",this.selectedIndex);
    //   if(result!=null)this.selectedIndex = result;
    // });

    this.events.subscribe('remove:location', (status) => {
      if(status==true) {
        this.RemoveLocation();
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressBookPage');
  }

  ionViewDidEnter() {
    this.GetLocations(this.token);
  }

  addClicked() {
    this.removeOption=false;
    this.navCtrl.push(AddAddressPage,{},{animate:true,animation:'transition',duration:500,direction:'forward'});
  }

  SelectedLocation(index) {
    console.log("index", index);
    this.selectedIndex = index;
    if(this.removeOption == true) {
      let modal = this.modalCtrl.create(RemoveLocationPopupPage, {},{enableBackdropDismiss: false});
      modal.present();
      // this.locations.splice(index, 1);
      // this.storage.set('places_location', JSON.stringify(this.locations));
    //   let loading = this.loading.create({
    //   content: 'Please wait...'
    // });
    // loading.present();
    // this.service.deleteLocation(this.token, index).subscribe(
    //   data=>{
    //     console.log('delete specific location response',data);
    //     loading.dismiss();
    //     this.GetLocations(this.token);
    //   },
    //   error=>{
    //     console.log('error',error);
    //     loading.dismiss();
    //   }
    // )
    }
    else {
      // this.place = this.locations[index];
      // console.log("place", this.place.name);
      // this.storage.set('selectedIndex', this.selectedIndex);
      // this.events.publish('selectedPlace', this.place);

      let loading = this.loading.create({
      content: 'Please wait...'
    });
    loading.present();
    this.service.getLocation(this.token, index).subscribe(
      data=>{
        console.log('get specific location response',data);
        loading.dismiss();
        this.place = data;
        this.place = this.place.Data;
        this.place = this.place[0];
        // this.storage.set('selectedIndex', this.selectedIndex);
        this.events.publish('selectedPlace', this.place);

      },
      error=>{
        console.log('error',error);
        loading.dismiss();
      }
    )


    }


  }

  removeClicked() {
    this.removeOption = true;
  }

  doneAddressBook() {
    // this.place = this.locations[this.selectedIndex];
    this.events.publish('selectedPlace', this.place);
    this.navCtrl.pop();
  }


  GetLocations(token){

    let loading = this.loading.create({
      content: 'Please wait...'
    });
    loading.present();
    this.service.getLocations(token).subscribe(
      data=>{
        console.log('get location response',data);
        loading.dismiss();
        this.locations = data;
        this.locations = this.locations.Data;
        this.selectedIndex = this.locations[this.locations.length - 1].id;
        this.place = this.locations[this.locations.length - 1];
      },
      error=>{
        console.log('error',error);
        loading.dismiss();
      }
    );
  }

  RemoveLocation() {
      let loading = this.loading.create({
      content: 'Please wait...'
    });
    loading.present();
    this.service.deleteLocation(this.token, this.selectedIndex).subscribe(
      data=>{
        console.log('delete specific location response',data);
        loading.dismiss();
        this.GetLocations(this.token);
      },
      error=>{
        console.log('error',error);
        loading.dismiss();
      }
    )
  }

}
