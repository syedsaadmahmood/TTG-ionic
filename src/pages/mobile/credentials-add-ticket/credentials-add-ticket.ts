import {ChangeDetectorRef, Component} from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TicketDetailPage} from "../ticket-detail/ticket-detail";
import {Storage} from "@ionic/storage";
import {ServicesProvider} from "../../../providers/services/services";

/**
 * Generated class for the CredentialsAddTicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-credentials-add-ticket',
  templateUrl: 'credentials-add-ticket.html',
})
export class CredentialsAddTicketPage {
  segment: string = "overview";
  descriptionText:string;
  credentialText:string;
  token:any;
  ticketsData:any;
  addTicketSegment:any;
  place:any;
  searchItem:any;
  myDate:any;
  isToggled:any;
  recurringValue:any;
  recurringToggle:any;
  searchItemName:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private chRef: ChangeDetectorRef, public events: Events, public loading: LoadingController, private service: ServicesProvider,public storage: Storage) {
    this.addTicketSegment=this.navParams.get('type');
    this.place=this.navParams.get('place');
    if(this.place!=undefined){
      this.place = this.place.name;
    }
    else {
      this.place = "string";
    }
    console.log("this.place",this.place);
    this.searchItem=this.navParams.get('searchItems');
    console.log("this.searchItem",this.searchItem);
    this.myDate=this.navParams.get('dateTime');
    this.isToggled=this.navParams.get('urgent');
    this.recurringValue=this.navParams.get('recurring');
    this.recurringToggle = this.navParams.get('recurringToggle');

    this.storage.get('token').then(
        result=>{
          this.token = result;
          console.log('token',this.token);
        }
      );
  }

  tabChangeDetect(){
    this.chRef.detectChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CredentialsAddTicketPage');
  }

  NextClicked(){
    this.addSingleTicket();
  }

    addSingleTicket() {

    for(var i=0;i<this.searchItem.length;i++) {
      this.searchItemName.push(this.searchItem[i].name);
    }

    console.log("this.addTicketSegment",this.addTicketSegment);
    console.log("this.place",this.place);
    console.log("this.searchItem",this.searchItemName);
    console.log("this.myDate",this.myDate);
    console.log("this.isToggled",this.isToggled);
    console.log("this.recurringValue",this.recurringValue);
    console.log("this.credentials",this.credentialText);
    console.log("this.description",this.descriptionText);

    if(this.credentialText==undefined){
      this.credentialText = "string";
    }

    if(this.descriptionText==undefined){
      this.descriptionText = "string";
      console.log("this.descriptionText", this.descriptionText);
    }


    var body = {
      "type": this.addTicketSegment,
      "location": {
        "geoPoints": {
        "type": "string",
        "coordinates": [
          0
        ]
        },
        "street_address": this.place,
        "city": "string",
        "state": "string",
        "country": "string",
        "postal_code": 0
      },
      "service": this.searchItemName,
      "dateTime": this.myDate,
      "urgent": this.isToggled,
      "recurring": this.recurringValue,
      "credentials": this.credentialText,
      "prefered_guru": "string",
      "favorites_only": true,
      "description": this.descriptionText
    };

     let loading = this.loading.create({
      content: 'Please wait...'
    });
    loading.present();

    console.log("body", body);
    console.log('credentialaddticket publish');

    this.service.addTicket(this.token, body).subscribe(
      data=>{
        console.log("response addTicket", data);
        this.ticketsData  = data;
        this.ticketsData = this.ticketsData.Data;
          loading.dismiss();
        this.navCtrl.push(TicketDetailPage,{id: this.ticketsData.id, description: this.descriptionText, credentials: this.credentialText, cross: true, isToggled: this.isToggled, recurringValue: this.recurringValue, recurringToggle: this.recurringToggle, myDate: this.myDate},{animate:true,animation:'transition',duration:500,direction:'forward'});
        },
      error=>{
        console.log('error',error);
        loading.dismiss();
      }
    );

  }

}
