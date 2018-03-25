import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, LoadingController, Events, AlertController, App,
  Platform
} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {InAppBrowser,InAppBrowserOptions} from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage';
import { Http,Headers,Response } from '@angular/http';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import {AuthenticationProvider} from "../../../providers/authentication/authentication";
import {TabsPage} from "../../mobile/tabs/tabs";
import {OverviewDesktopPage} from "../../desktop/overview-desktop/overview-desktop";


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  showPassField = false;
  email:any;
  platform: any;

  private loginForm : FormGroup;

  constructor(
    private auth: AuthenticationProvider,
    public navCtrl: NavController,
    private store:Storage,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public http:Http,
    public iab: InAppBrowser,
    public loading: LoadingController,
    public alertCtrl: AlertController,
    public events: Events,
    public appCtrl: App,
    public themeableBrowser: ThemeableBrowser,
    public plt: Platform) {

    // this.store.set('isAuthenticated',true);

    this.loginForm = this.formBuilder.group({
      email:  ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      // description: [''],
    });

  }

  // presentLoadingDefault() {
  //   let loading = this.loading.create({
  //     content: 'Please wait...'
  //   });
  //
  //   loading.present();
  //
  //   setTimeout(() => {
  //     loading.dismiss();
  //   }, 1000);
  // }


  loginSubmit(){
    this.email = this.email.toLowerCase();

    if (this.email.indexOf('guru') != -1) {

      let browser = this.iab.create('https://login.microsoftonline.com/5aca5625-b556-434d-9924-c70c5496f1fa/oauth2/authorize?client_id=7c0a7661-8588-427d-b9de-ad63b08803c7&response_type=code&redirect_uri=https://ttgpublicdev.azurewebsites.net/api/MemberAuth&response_mode=query&scope=openid%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2Fcalendar.read%20https%3A%2F%2Fgraph.microsoft.com%2Fmail.ReadWrite&resource=7c0a7661-8588-427d-b9de-ad63b08803c7&state=12345&login_hint=' + this.email, '_blank', 'location=no,toolbar=yes,closebuttoncaption=Done,EnableViewPortScale=yes');

      browser.on('loadstart').subscribe(event => {
        console.log("loadstart -->", event);
        console.log(event);

        if (event.url.includes("?code")) {
          console.log('Call API for this URL: ');
          console.log(event.url);
          browser.close();
          let loading = this.loading.create({
            content: 'Please wait...'
          });
          loading.present();
          this.http.get(event.url).map(res => res.json()).subscribe(data => {
            console.log("Access Token");
            console.log(data.access_token);

            this.store.set('isAuthenticated',true);
            this.store.set('token',data.access_token);
            this.store.set('userEmail', this.email);
            this.store.set('persona', 'tech_owner');
            this.events.publish('persona', 'tech_owner');
            loading.dismiss();

            this.events.publish('user:canRun', true);

            if (this.plt.is('core')) {
                this.platform = "desktop";
                console.log('platform', 'desktop');
                this.appCtrl.getRootNav().setRoot(OverviewDesktopPage);
            }
            else {
              this.platform = "mobile";
              console.log('platform', 'mobile');
              this.appCtrl.getRootNav().setRoot(TabsPage);
            }


          });

        }

      }, err => {
        console.log("InAppBrowser loadstart Event Error: " + err);
      });

    }

    else
      {
        let browser = this.iab.create('https://login.microsoftonline.com/ttgdevclients.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_CustomerAuth&client_id=f9d42071-e40a-4f21-b4cf-32e483a56e93&nonce=123456&redirect_uri=https://ttgpublicdev.azurewebsites.net/api/CustomerAuth&scope=openid%20offline_access%20https%3A%2F%2Fttgdevclients.onmicrosoft.com%2Fusers%2Fuser_impersonation&response_type=code&response_mode=query&prompt=login&login_hint=' + this.email, '_blank', 'location=no,toolbar=yes,closebuttoncaption=Done,EnableViewPortScale=yes');

        browser.on('loadstart').subscribe(event => {
        console.log("loadstart -->", event);
        console.log(event);

        if (event.url.includes("?code")) {
          console.log('Call API for this URL: ');
          console.log(event.url);
          browser.close();
          let loading = this.loading.create({
            content: 'Please wait...'
          });
          loading.present();
          this.http.get(event.url).map(res => res.json()).subscribe(data => {
            console.log("Access Token");
            console.log(data.access_token);

            this.store.set('isAuthenticated',true);
            this.store.set('token',data.access_token);
            this.store.set('userEmail', this.email);
            this.store.set('persona', 'customer');
            this.events.publish('persona', 'customer');
            loading.dismiss();

            this.events.publish('user:canRun', true);

            if (this.plt.is('core')) {
              this.platform = "desktop";
              console.log('platform', 'desktop');
              this.appCtrl.getRootNav().setRoot(OverviewDesktopPage);
            }
            else {
              this.platform = "mobile";
              console.log('platform', 'mobile');
              this.appCtrl.getRootNav().setRoot(TabsPage);
            }

          });

        }

      }, err => {
        console.log("InAppBrowser loadstart Event Error: " + err);
      });
      }



    // test app as ionic serve
    // var temp = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vdGZwLzk0ZWUyOGM3LTRlNzUtNGExNi1iMTE0LWMzZTE2OTRkMjBiYi9iMmNfMV9jdXN0b21lcmF1dGgvdjIuMC8iLCJleHAiOjE1MjA0MTAzNzMsIm5iZiI6MTUyMDMyMzk3MywiYXVkIjoiZjlkNDIwNzEtZTQwYS00ZjIxLWI0Y2YtMzJlNDgzYTU2ZTkzIiwib2lkIjoiMDQyZTg1ZGQtYzI2OC00NWNmLTg5NjMtNzQ2YzQwNWY5NmM3Iiwic3ViIjoiMDQyZTg1ZGQtYzI2OC00NWNmLTg5NjMtNzQ2YzQwNWY5NmM3IiwiZmFtaWx5X25hbWUiOiJBZGFtIiwiZ2l2ZW5fbmFtZSI6Ik1pbG5lIiwibmFtZSI6InVua25vd24iLCJlbWFpbHMiOlsibWlsbmVhZGFtNjU1QGdtYWlsLmNvbSJdLCJ0ZnAiOiJCMkNfMV9DdXN0b21lckF1dGgiLCJub25jZSI6IjEyMzQ1NiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsImF6cCI6ImY5ZDQyMDcxLWU0MGEtNGYyMS1iNGNmLTMyZTQ4M2E1NmU5MyIsInZlciI6IjEuMCIsImlhdCI6MTUyMDMyMzk3M30.HrHuZSk2R1way079H2-wL7pYilcu5QMoi7OOGMF2zfZczkrCqLSrsgyNOpn1ZpeCfMTuY2KMEsnAZb4FIf2qPefLfWbW5f_J7ojBl7cpU5efTjIH3YM2HdjlFhoU_dfr6xSGsK0Pxq-T_rFXcZ0sAMshHdPt0wEfqhUnNQR2Yn_SHZgxO7fhKVacv2fesMn0nxPXGDdavtAJ83zxq6SmYv9knen2jV8D8CQPHv-KJ6fcfoVgfyT77AbRz0M5qFqOyUgF52AQHoc7cdibVJy3Sr5yQvaipg7p_VGbjQ4DrCb7s2pc2feO4uT9Gr26VSOJ1YwtlWfvTXPy_SGta7nhIw";
    // this.store.set('isAuthenticated',true);
    // this.store.set('token',temp);
    // this.store.set('userEmail', this.email);
    // this.events.publish('user:canRun', true);
    // if (this.plt.is('core')) {
    //   this.platform = "desktop";
    //   console.log('platform', 'desktop');
    //   this.appCtrl.getRootNav().setRoot(OverviewDesktopPage);
    // }
    // else {
    //   this.platform = "mobile";
    //   console.log('platform', 'mobile');
    //   this.appCtrl.getRootNav().setRoot(TabsPage);
    // }

}

  ionViewDidLoad() {

  }

}
