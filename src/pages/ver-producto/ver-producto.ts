import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the VerProductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-ver-producto',
  templateUrl: 'ver-producto.html',
})
export class VerProductoPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http:HTTP,
              public storage:Storage,
              public loading:LoadingController
             ){
                storage.get('id').then((val) => {  
                this.mostrarProductoEnSucursales(val);
                });   
  }
  sucursales;
  total;
  ionViewDidLoad() {
                console.log('ionViewDidLoad VerProductoPage');
  }
  mostrarProductoEnSucursales(id){
      let loader = this.loading.create({
            content: "Please wait...",
            duration: 8000
        });
      loader.present();
      let parametros = {
           id_producto:id,
           lat:"-34.6012424",
           lng:"-58.377395",
           limit:10
          }
      this.http.get('https://d735s5r2zljbo.cloudfront.net/prod/producto', parametros, {})
      .then((response)=>{
                response.data = JSON.parse(response.data);
                this.sucursales = response.data.sucursales;
                this.total = response.data.total;
                loader.dismiss();
              })
      .catch(error => {
            alert(error); // Error message
          });
  }
}
