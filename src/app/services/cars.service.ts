import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient) { }

  headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, PUT',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Authorization':'xyz'
  }

  requestOptions = {
    headers: new HttpHeaders(this.headerDict)
  }

  randomString(length){
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  fetchAllCares(){
    const url = environment.baseUrl + 'api/car/v1.0/cars';
    let body = {
      Paging:{
      PageNo:1,
      PageSize:10}
    }
    return this.http.post<any>(url, body,this.requestOptions);
  }

  updateCars(data){
    
    const url = environment.baseUrl + 'api/car/v1.0/cars/update';
    return this.http.put<any>(url, {
      Car:{
      Id:data.id,
      Name: data.name,
      Manufacturer: data.manufact,
      Type: data.types,
      Price: data.price,
      Mileage: data.milage,
    }}, this.requestOptions);
  }

  deleteCars(carId){
    const url = environment.baseUrl + `api/car/v1.0/cars/delete/${carId}`;
    return this.http.delete<any>(url,this.requestOptions);
  }
}
