import {Storage} from "@ionic/storage";
import {Injectable} from "@angular/core";
import {Events} from "ionic-angular";

@Injectable()
export class Constants{
  persona:any;

  constructor(public storage: Storage, public events: Events){
    this.storage.get('persona').then(
        result=>{
          this.persona = result;
          console.log('persona',this.persona);
        }
      );

    this.events.subscribe('persona', (result) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      // console.log('Welcome', user, 'at', time);
      this.persona = result;
      console.log('persona event subscribe', this.persona);
    });


  }

  apiAddress()
  {
    console.log('persona',this.persona);
    if(this.persona=='tech_owner') {
      return 'https://ttgmembersdev.azurewebsites.net/api';
    }

    else if(this.persona=='customer'){
      return 'https://ttgcustomersdev.azurewebsites.net/api';
    }

  }


  // static apiAddress='https://ttgcustomersdev.azurewebsites.net/api';
  // static apiAddress = 'https://ttgmembersdev.azurewebsites.net/api';
  // static apiAddress='http://192.168.100.45:5858/api';

}

