import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Constants} from "../constants";
import 'rxjs/add/operator/map';


/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthenticationProvider Provider');
  }

  // login(user, pass) {
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   let body = new FormData();
  //   body.append('grant_type', this.granytype);
  //   body.append('username', user.value);
  //   body.append('password', pass.value);
  //   body.append('client_id', this.clientid);
  //   body.append('client_secret', this.clientsecret);
  //
  //   return this.http.get(Constants.apiAddress + '/requests',body,{headers:headers});
  // }

}
