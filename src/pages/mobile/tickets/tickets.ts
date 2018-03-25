import { Component,ChangeDetectorRef } from '@angular/core';
import {
  IonicPage, NavController, Events, NavParams, Refresher, ToastController, LoadingController, ModalController,
  ViewController, Platform, App, MenuController
} from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { TicketDetailPage } from '../ticket-detail/ticket-detail';
import { TicketPopupPage } from '../ticket-popup/ticket-popup';
import {ServicesProvider} from "../../../providers/services/services";
import {AddTicketPage} from "../add-ticket/add-ticket";
import {LoginPage} from "../../common/login/login";
/**
 * Generated class for the TicketsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

let id:any;

@Component({
  selector: 'page-tickets',
  templateUrl: 'tickets.html',
})
export class TicketsPage {
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
  availableData=new Array();
  upcomingData=new Array();
  platform: any;
  persona:any;
  email:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public loading: LoadingController,
    private service: ServicesProvider,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public storage: Storage,
    public viewCtrl: ViewController,
    private chRef: ChangeDetectorRef,
    public plt: Platform,
    public menu: MenuController,
    public app:App)
{

  if (plt.is('core')) {
    this.platform = "desktop";
    console.log('platform', 'desktop');
  }
  else {
    this.platform = "mobile";
    console.log('platform', 'mobile');
  }


      this.storage.get('token').then(
        result=>{
          this.token = result;
          console.log('token',this.token);
          this.getTicketsFunction(this.token);
        }
      );

      this.storage.get('userEmail').then(
        result=>{
          this.email = result;
          console.log('email',this.email);
        }
      );

      this.storage.get('persona').then(
        result=>{
          this.persona = result;
          console.log('persona ticket',this.persona);
          if(this.persona == "customer"){
            this.segment = "open";
          }
          else if(this.persona == "tech_owner")
          this.segment = "inbox";
        }
      );



    // this.events.subscribe('remove:ticket', (data) => {
    //   console.log('remove:ticket subscribe', data);
    //   // if(this.requestedData.indexOf({id:data.request_id})!=-1){
    //   //   var index = this.requestedData.indexOf({id:data.request_id});
    //   //   this.requestedData.splice(index, 1);
    //   // }
    //   console.log("length", this.requestedData.length);
    //
    //   for(var i=0; i<this.requestedData.length; i++)
    //   {
    //     if(this.requestedData[i].id=data.request_id) {
    //       this.requestedData.splice(i, 1);
    //     }
    //   }
    //
    // });

}

  tabChangeDetect(){
    this.chRef.detectChanges();

  }

  openTicketModal() {
    if(this.persona == "customer") {
      let modal = this.modalCtrl.create(TicketPopupPage,{},{showBackdrop:true, enableBackdropDismiss:true});
      modal.present();
    }

    else if(this.persona == 'tech_owner') {
      this.navCtrl.push(AddTicketPage,{},{animate:true,animation:'transition',duration:500,direction:'forward'});
    }

  }

  navigationToTicketDetail(tId) {
    this.navCtrl.push(TicketDetailPage,{id:tId, cross: false},{animate:true,animation:'transition',duration:500,direction:'forward'});
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

        if(this.ticketsData.length !=0 && this.ticketsData != null) {
            this.storage.set("customer_id", this.ticketsData[0].customer_id);

            if(this.persona == "customer") {
              this.companyName = this.ticketsData[0].company.name;
              var tempArray = this.ticketsData[0].company.offices[0].customers;
              for (var k = 0; k < tempArray.length; k++) {
                if (this.email == tempArray[k].email) {
                  this.userName = tempArray[k].first_name + " " + tempArray[k].last_name;
                  break;
                }
              }

              this.events.publish('companyName&UserName', {"companyName": this.companyName, "userName": this.userName});
            }

            if(this.persona == "tech_owner") {
              this.userName = this.ticketsData[0].guru[0].guru.display_name;
              this.events.publish('companyName&UserName', {"companyName": this.companyName, "userName": this.userName});
            }





            for (var i = 0; i < this.ticketsData.length; i++) {

              if(this.persona == "customer") {
                if (this.ticketsData[i].status != null && this.ticketsData[i].status == "Pending") {
                var obj1 = {
                  name: this.ticketsData[i].company.name,
                  id: this.ticketsData[i].id,
                  onSite: this.ticketsData[i].type,
                  status: this.ticketsData[i].status,
                  date: this.ticketsData[i].dataTime
                };
                if (this.checkObject(this.requestedData, obj1) == false) {
                  this.requestedData.push(obj1);
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
                    if (this.checkObject(this.onWayData, obj2) == false) {
                      this.onWayData.push(obj2);
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
                    if (this.checkObject(this.scheduleData, obj3) == false) {
                      this.scheduleData.push(obj3);
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
                if (this.checkObject(this.closedData, obj4) == false) {
                  this.closedData.push(obj4);
                }

              }
              }

              else if(this.persona == "tech_owner") {

                if (this.ticketsData[i].status != null && this.ticketsData[i].status == "Assigned") {

                  var customer_id = this.ticketsData[i].customer_id;
                  var offices = this.ticketsData[i].company.offices;
                  for(var p=0; p<offices.length; p++){
                    var customersArray = offices[p].customers;
                    for(var r=0; r<customersArray.length; r++){
                      if(customersArray[r].id == customer_id){
                        var nameCustomer = customersArray[r].first_name + ' ' + customersArray[r].last_name;
                        break;
                      }

                    }
                  }

                  var obj5 = {
                    name: nameCustomer,
                    id: this.ticketsData[i].id,
                    onSite: this.ticketsData[i].type,
                    status: this.ticketsData[i].status,
                    date: this.ticketsData[i].dataTime
                  };
                if (this.checkObject(this.upcomingData, obj5) == false) {
                  this.upcomingData.push(obj5);
                }

              }

              if (this.ticketsData[i].status != null && this.ticketsData[i].status == "Pending") {

                  var customer_id1 = this.ticketsData[i].customer_id;
                  var offices1 = this.ticketsData[i].company.offices;
                  for(var a=0; a<offices1.length; a++){
                    var customers = offices1[a].customers;
                    for(var e=0; r<customers.length; e++){
                      if(customers[e].id == customer_id1){
                        var nameCust = customers[e].first_name + ' ' + customers[e].last_name;
                        break;
                      }

                    }
                  }

                  var obj6 = {
                    name: nameCust,
                    id: this.ticketsData[i].id,
                    onSite: this.ticketsData[i].type,
                    status: this.ticketsData[i].status,
                    date: this.ticketsData[i].dataTime
                  };
                if (this.checkObject(this.availableData, obj6) == false) {
                  this.availableData.push(obj6);
                }

              }

              }

            }

          if (this.refreshData == true) {
            const toast = this.toastCtrl.create({
              message: 'Tickets have been updated.',
              duration: 3000
            });
            toast.present();
          }
          loading.dismiss();

        }

      },
      error=>{
        console.log('error',error);
        loading.dismiss();
        if(error.statusText == 'Unauthorized')
        {
          this.logoutOption();
        }
      }
    );
  }

  doRefresh(refresher: Refresher) {
    setTimeout(() => {
        this.refreshData=true;
        this.getTicketsFunction(this.token);
        refresher.complete();
      }, 1000);
    };



  ionViewDidLoad() {
    this.chRef.detectChanges();
  }

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

  logoutOption(){
    this.presentLoadingDefault();
    this.storage.set('isAuthenticated',false);
    this.storage.set('token','');
    this.events.publish('user:canRun', false);
    this.menu.enable(false);
    this.app.getRootNav().push(LoginPage);
  }

  presentLoadingDefault() {
    let loading = this.loading.create({
      content: 'Logging Out'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }


}
