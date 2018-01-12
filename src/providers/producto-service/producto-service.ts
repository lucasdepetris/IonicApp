import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
/*
  Generated class for the ProductoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductoServiceProvider {

  constructor(public http: HTTP,public loading:LoadingController) {
    console.log('Hello ProductoServiceProvider Provider');
  }
  getProductos(params):any {
    let loader = this.loading.create({
          content: "Please wait...",
          duration: 8000
      });
    loader.present();
    let promise = new Promise((resolve,reject)=> {
      let value = true;
      
      this.http.get('https://d735s5r2zljbo.cloudfront.net/prod/productos', params, {})
          .then((response)=>{
            response.data = JSON.parse(response.data);
            resolve(response.data.productos);
            loader.dismiss();
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
