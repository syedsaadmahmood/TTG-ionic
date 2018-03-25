import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Constants} from "../constants";
import 'rxjs/add/operator/map';

/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {

  constructor(public http: HttpClient, private constant: Constants) {

  }

  getTickets(token){
    let headerJson = {'Authorization': 'Bearer ' +token};
    let headers=new HttpHeaders(headerJson);
    return this.http.get(this.constant.apiAddress() + '/requests',{headers:headers});
  }

  getTicketDetail(token,id){
    let headerJson = {'Authorization': 'Bearer ' +token};
    let headers=new HttpHeaders(headerJson);
    return this.http.get(this.constant.apiAddress() + '/requests?request_id=' +id,{headers:headers});
  }

  getService(token){
    let headerJson = {'Authorization': 'Bearer ' +token};
    let headers=new HttpHeaders(headerJson);
    return this.http.get(this.constant.apiAddress() + '/service',{headers:headers});
  }

 addTicket(token, body){
    let headerJson = {'Authorization': 'Bearer ' +token};
    let headers=new HttpHeaders(headerJson);
    // body = JSON.stringify(body);
    return this.http.post(this.constant.apiAddress() + '/requests/', body,{headers:headers});
  }

  updateTicket(token, body){
    let headerJson = {'Authorization': 'Bearer ' +token};
    let headers=new HttpHeaders(headerJson);
    // body = JSON.stringify(body);
    return this.http.put(this.constant.apiAddress() + '/requests/', body,{headers:headers});
  }

  getLocations(token){
    let headerJson = {'Authorization': 'Bearer ' +token};
    let headers=new HttpHeaders(headerJson);
    return this.http.get(this.constant.apiAddress() + '/location',{headers:headers});
  }

  getLocation(token, id){
    let headerJson = {'Authorization': 'Bearer ' +token};
    let headers=new HttpHeaders(headerJson);
    return this.http.get(this.constant.apiAddress() + '/location?location_id=' +id,{headers:headers});
  }

  addLocation(token, body){
    let headerJson = {'Authorization': 'Bearer ' +token};
    let headers=new HttpHeaders(headerJson);
    // body = JSON.stringify(body);
    return this.http.post(this.constant.apiAddress() + '/location/', body,{headers:headers});
  }

  deleteLocation(token, id){
    let headerJson = {'Authorization': 'Bearer ' +token};
    let headers=new HttpHeaders(headerJson);
    // body = JSON.stringify(body);
    return this.http.delete(this.constant.apiAddress() + '/location?location_id=' +id,{headers:headers});
  }

  getCustomers(token, name){
    let headerJson = {'Authorization': 'Bearer ' +token};
    let headers=new HttpHeaders(headerJson);
    return this.http.get(this.constant.apiAddress() + '/customersByName?customer_name=' +name,{headers:headers});
  }

  getTechs(token, name){
    let headerJson = {'Authorization': 'Bearer ' +token};
    let headers=new HttpHeaders(headerJson);
    return this.http.get(this.constant.apiAddress() + '/GurusByName?guru_name=' +name,{headers:headers});
  }

  addQuote(token, body){
    let headerJson = {'Authorization': 'Bearer ' +token};
    let headers=new HttpHeaders(headerJson);
    // body = JSON.stringify(body);
    return this.http.post(this.constant.apiAddress() + '/quotes/', body,{headers:headers});
  }

  getQuotes(token){
    let headerJson = {'Authorization': 'Bearer ' +token};
    let headers=new HttpHeaders(headerJson);
    return this.http.get(this.constant.apiAddress() + '/quotes',{headers:headers});
  }

  addCustomer(token, body){
    let headerJson = {'Authorization': 'Bearer ' +token};
    let headers=new HttpHeaders(headerJson);
    // body = JSON.stringify(body);
    return this.http.post(this.constant.apiAddress() + '/company/', body,{headers:headers});
  }
}
