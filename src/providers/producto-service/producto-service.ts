import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the ProductoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductoServiceProvider {

  constructor(public http: HTTP) {
    console.log('Hello ProductoServiceProvider Provider');
  }
  getProductos(params):any {
   
    let promise = new Promise((resolve,reject)=> {
      let value = true;
      
      this.http.get('https://d735s5r2zljbo.cloudfront.net/prod/productos', params, {})
          .then((response)=>{
            response.data = JSON.parse(response.data);
            alert(response.data.productos);
            resolve(response.data.productos);
            })
          .catch(error => {
              reject(error); // Error message
            })
     /* setTimeout(function() {
        if(value){resolve("this value is true!");}
        else{reject("this value is not true!");}
      }, 3000);*/
    })
    return promise;
          
      /*
     await this.http.get('https://d735s5r2zljbo.cloudfront.net/prod/productos', params, {})
          .then((response)=>{
            response.data = JSON.parse(response.data);
            return response.data.productos;
            })
          .catch(error => {
              alert(error); // Error message
            });*/
    }
    getPrueba():String{
      var msg = "holaprueba";
      return msg;
    }      
}
