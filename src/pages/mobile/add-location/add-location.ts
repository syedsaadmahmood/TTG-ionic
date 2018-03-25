import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {ServicesProvider} from "../../../providers/services/services";

/**
 * Generated class for the AddLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google:any;
declare var $:any;
let latitude:any;
let longitude:any;

@Component({
  selector: 'page-add-location',
  templateUrl: 'add-location.html',
})
export class AddLocationPage {
  @ViewChild('mapCanvas') mapElement: ElementRef;

  map:any;
  token:any;
  city:any;
  state:any;
  country:any;
  postal_code:any;
  latitude:any;
  longitude:any;
  street_address:any;
  place:any;
  directionsService:any;
  directionsDisplay:any;
  current_marker:any;
  current_icon = {
    url: "https://senion.com/wp-content/uploads/2015/07/bluedot.png",//url
    scaledSize: new google.maps.Size(32, 26), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(16, 16) // anchor
        };

  constructor(public navCtrl: NavController, public navParams: NavParams, private chRef: ChangeDetectorRef, public events: Events, private service: ServicesProvider, public loading: LoadingController, public storage: Storage) {
    this.place = this.navParams.get('place');

     latitude = this.place.geometry.location.lat();
     longitude = this.place.geometry.location.lng();

     this.storage.get('token').then(
      result=>{
        this.token = result;
      });
  }


  ionViewDidLoad() {

    this.showMap();
    // this.inputAddress();
    this.showMarker();

  }

  showMarker(){
    console.log('showMarker');

    if(latitude==undefined || longitude==undefined)return;

    if(this.current_marker!=undefined)this.current_marker.setMap(null);

    var bounds = new google.maps.LatLngBounds();
    var location=new google.maps.LatLng(latitude, longitude);
    bounds.extend(location);
    this.current_marker=new google.maps.Marker({
      position: location,
      map: this.map,
      icon: this.current_icon,
    });


    this.map.fitBounds(bounds);
    // this.map.setZoom(10);

  }

  showMap() {

    console.log('showMap');
    let mapEle = this.mapElement.nativeElement;

    this.map = new google.maps.Map(mapEle, {
      zoom: 6,
      center: {lat: 37.0902, lng: 95.7129},
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    });

    this.map.setOptions({
    maxZoom: 15,
    minZoom: 10
});


    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});

    this.directionsDisplay.setMap(this.map);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');

    });
  }


  // inputAddress() {
  //   console.log('inputAddress');
  //
  //   var input = document.getElementById('searchTextField');
  //   var context=this;
  //
  //   var searchBox = new google.maps.places.Autocomplete(input);
  //   searchBox.addListener('place_changed', function() {
  //
  //     console.log('place changed');
  //     var place = searchBox.getPlace();
  //
  //     console.log('address', place);
  //
  //     latitude = place.geometry.location.lat();
  //     longitude = place.geometry.location.lng();
  //     console.log('longitude', longitude);
  //     console.log('latitude', latitude);
  //     console.log('input value',$("#searchTextField").val());
  //     context.locationAddress = $("#searchTextField").val();
  //
  //     context.showMarker();
  //
  //   });
  // }

  addLocationButton() {
    this.calculateLocation();
    this.AddLocation(this.token);
    // this.events.publish('chosen_place', this.place);
  }

  calculateLocation() {
    for(var i=0;i<this.place.address_components.length;i++)
    {
      for(var j=0;j<this.place.address_components[i].types.length;j++)
      {
        if(this.place.address_components[i].types[j] == "administrative_area_level_2")
        {
          this.city = this.place.address_components[i].long_name;
        }

        if(this.place.address_components[i].types[j] == "administrative_area_level_1")
        {
          this.state = this.place.address_components[i].long_name;
        }

        if(this.place.address_components[i].types[j] == "country")
        {
          this.country = this.place.address_components[i].long_name;
        }

        if(this.place.address_components[i].types[j] == "postal_code")
        {
          this.postal_code = this.place.address_components[i].long_name;
        }

      }
    }

    latitude = this.place.geometry.location.lat();
    longitude = this.place.geometry.location.lng();
    this.street_address = this.place.name;

    console.log('city: ',this.city);
    console.log('state: ',this.state);
    console.log('country: ',this.country);
    console.log('postal_code: ',this.postal_code);
    console.log('latitude: ',latitude);
    console.log('longitude: ',longitude);
    console.log('street_address: ',this.street_address);

    if(this.city==undefined) this.city="string";
    if(this.state==undefined) this.state="string";
    if(this.country==undefined) this.country="string";
    if(this.postal_code==undefined) this.postal_code=0;
    if(this.latitude==undefined) this.latitude=0;
    if(this.longitude==undefined) this.longitude=0;
    if(this.street_address==undefined) this.street_address="string";


  }

  AddLocation(token){

    var body = {
      "geoPoints": {
      "type": "points",
      "coordinates": [
        latitude,
        longitude
      ]
      },
      "street_address": this.street_address,
      "city": this.city,
      "state": this.state,
      "country": this.country,
      "postal_code": this.postal_code
    };

    let loading = this.loading.create({
      content: 'Please wait...'
    });
    loading.present();
    this.service.addLocation(token, body).subscribe(
      data=>{
        console.log('add location response',data);
        loading.dismiss();
        this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-3))
      },
      error=>{
        console.log('error',error);
        loading.dismiss();
      }
    );
  }



}
