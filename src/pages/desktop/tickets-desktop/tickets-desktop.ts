import { Component } from '@angular/core';
import {
  IonicPage, LoadingController, ModalController, NavController, NavParams, Refresher,
  ToastController
} from 'ionic-angular';
import {ServicesProvider} from "../../../providers/services/services";
import {Storage} from "@ionic/storage";
import {TicketDetailPage} from "../../mobile/ticket-detail/ticket-detail";
import {TicketPopupPage} from "../../mobile/ticket-popup/ticket-popup";
import {AddTicketDesktopPage} from "../add-ticket-desktop/add-ticket-desktop";

/**
 * Generated class for the TicketsDesktopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tickets-desktop',
  templateUrl: 'tickets-desktop.html',
})
export class TicketsDesktopPage {

  companyName: any;
  userName: any;
  segment: any;
  userDp:any = "https://www.library.caltech.edu/sites/default/files/styles/headshot/public/default_images/user.png?itok=1HlTtL2d";
  token:any;
  ticketsData:any;
  refreshData=false;
  onWayData=new Array();
  requestedData=new Array();
  scheduleData=new Array();
  closedData=new Array();
  platform: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingController,
    private service: ServicesProvider,
    public storage: Storage,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
  ) {

    this.storage.get('token').then(
        result=>{
          this.token = result;
          console.log('token',this.token);
          this.getTicketsFunction(this.token);
        }
      );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketsDesktopPage');
  }

  getTicketsFunction(token){
    let loading = this.loading.create({
      content: 'Please wait...'
    });
    loading.present();
    this.service.getTickets(token).subscribe(
      data=> {
        console.log('get tickets view', data);
        this.ticketsData = data;
        this.ticketsData = this.ticketsData.Data;
        if (this.ticketsData != null) {
          this.companyName = this.ticketsData[0].company.name;
          var tempArray = this.ticketsData[0].company.offices[0].customers;
          // for(var k=0; k<tempArray.length;k++)
          // {
          //   if(this.email==tempArray[k].email){
          //     this.userName = tempArray[k].first_name + " " + tempArray[k].last_name;
          //     break;
          //   }
          // }

          // this.events.publish('companyName&UserName', {"companyName": this.companyName, "userName": this.userName});

        for (var i = 0; i < this.ticketsData.length; i++) {

          if (this.ticketsData[i].status != null && this.ticketsData[i].status == "Pending") {
            var obj1 = {
                name: this.ticketsData[i].company.name,
                id: this.ticketsData[i].id,
                onSite: this.ticketsData[i].type,
                status: this.ticketsData[i].status,
                date: this.ticketsData[i].dataTime
              };
            if(this.checkObject(this.requestedData, obj1)==false)
            {
              this.requestedData.push({
                name: this.ticketsData[i].company.name,
                id: this.ticketsData[i].id,
                onSite: this.ticketsData[i].type,
                status: this.ticketsData[i].status,
                date: this.ticketsData[i].dataTime
              });
            }


          }
          if (this.ticketsData[i].status != null && this.ticketsData[i].status == "Assigned") {
            for (var j = 0; j < this.ticketsData[i].guru.length; j++) {
              if (this.ticketsData[i].guru[j].status == "OnTheWay") {
                var obj2 = {
                  id: this.ticketsData[i].id,
                  name: this.ticketsData[i].guru[j].guru.display_name,
                  onSite: this.ticketsData[i].type,
                  status: this.ticketsData[i].guru[j].status,
                  date: this.ticketsData[i].dataTime
                };
                if(this.checkObject(this.onWayData, obj2)==false)
                {
                  this.onWayData.push({
                  id: this.ticketsData[i].id,
                  name: this.ticketsData[i].guru[j].guru.display_name,
                  onSite: this.ticketsData[i].type,
                  status: this.ticketsData[i].guru[j].status,
                  date: this.ticketsData[i].dataTime
                });
                }

              }
              if (this.ticketsData[i].guru[j].status == "Assigned") {
                var obj3 = {
                  name: this.ticketsData[i].company.name,
                  id: this.ticketsData[i].id,
                  onSite: this.ticketsData[i].type,
                  status: this.ticketsData[i].status,
                  date: this.ticketsData[i].dataTime
                };
                if(this.checkObject(this.scheduleData, obj3)==false)
                {
                  this.scheduleData.push({
                  name: this.ticketsData[i].company.name,
                  id: this.ticketsData[i].id,
                  onSite: this.ticketsData[i].type,
                  status: this.ticketsData[i].status,
                  date: this.ticketsData[i].dataTime
                });
                }

              }
            }

          }

          if (this.ticketsData[i].status != null && this.ticketsData[i].status == "Completed") {
            var obj4 = {
              name: this.ticketsData[i].company.name,
              id: this.ticketsData[i].id,
              onSite: this.ticketsData[i].type,
              status: this.ticketsData[i].status,
              date: this.ticketsData[i].dataTime
            };
            if(this.checkObject(this.closedData, obj4)==false)
            {
              this.closedData.push({
              name: this.ticketsData[i].company.name,
              id: this.ticketsData[i].id,
              onSite: this.ticketsData[i].type,
              status: this.ticketsData[i].status,
              date: this.ticketsData[i].dataTime
            });
            }

          }

        }
      }

        if(this.refreshData==true){
          const toast = this.toastCtrl.create({
            message: 'Tickets have been updated.',
            duration: 3000
          });
          toast.present();
        }
        console.log('in on way data check',this.onWayData);
        console.log('in requested data check',this.requestedData);
        console.log('in scheduled data check',this.scheduleData);
        loading.dismiss();
      },
      error=>{
        console.log('error',error);
        loading.dismiss();
      }
    );
  }

  doRefresh(refresher: Refresher) {
    // this.onWayData=[];
    // this.requestedData=[];
    // this.closedData=[];
    // this.scheduleData=[];
    setTimeout(() => {
        this.refreshData=true;
        this.getTicketsFunction(this.token);
        refresher.complete();
      }, 1000);
    };

  checkObject(array, obj) {
    var value=false;
    for(var i=0; i<array.length; i++)
    {
      if(array[i].id == obj.id)
      {
        value = true;
        break;
      }
    }
    return value;
  }

    navigationToTicketDetail(tId) {
    this.navCtrl.push(TicketDetailPage,{id:tId, cross: false},{animate:true,animation:'transition',duration:500,direction:'forward'});
  }

    addTicketPage() {
    this.navCtrl.push(AddTicketDesktopPage,{},{});
  }

}
