import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { Geolocation } from '@ionic-native/geolocation';
import { ProductoServiceProvider } from '../../providers/producto-service/producto-service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    private http: HTTP,
    private geolocation: Geolocation,
    private productoService : ProductoServiceProvider) {
    this.presentToast()
    alert (this.productoService.getPrueba());
  }
  producto;
  productos;
  total;
  sucursales = [];
  weather = [];
  ubicacion = 12;
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000
    });
    toast.present();
  }
  probar(){
    let params = {
      string:"coca",
      lat:"-34.6012424",
      lng:"-58.377395",
      limit:10
    }
    if(this.producto != ""){
      params.string = this.producto;
    }
    var re;
        re = this.productoService.getProductos(params);
        re.then(
          resolved => this.productos = (resolved),
          error => alert(error)
          );
    let parametros = {
          id_producto:7790895001413,
          lat:"-34.6012424",
          lng:"-58.377395",
          limit:10
         }
   this.http.get('https://d735s5r2zljbo.cloudfront.net/prod/producto', parametros, {})
     .then((response)=>{
         response.data = JSON.parse(response.data);
         this.sucursales = response.data.sucursales;
         this.total = response.data.total;
       })
     .catch(error => {
             alert(error); // Error message
           });

      /*     let parametros2 = {
            q:"New york",
            units:"metric",
            lang:"es",
            APPID:"e0a75934b085feb0ed73485b82532968"
           }
     this.http.get('api.openweathermap.org/data/2.5/weather', parametros2, {})
       .then((response)=>{
           response.data = JSON.parse(response.data);
           this.weather = response.data.weather;
           alert(this.weather);
         })
       .catch(error => {
               alert(error); // Error message
             });*/
    let options = {
              timeout:30000,
              enableHighAccuracy:true
            };         
    let val = this.geolocation.getCurrentPosition(options).then((resp) => {
              this.ubicacion = 1;
              this.ubicacion = resp.coords.latitude;
              alert(resp.coords.latitude);
              let params3 = {
                string:"coca",
                lat:resp.coords.latitude,
                lng:resp.coords.longitude,
                limit:10
              }
              })
              .catch((error) => {
                                  this.ubicacion = 0;
                                  alert('Error getting location '+error.code+""+ error.message);
                                });
              //this.ubicacion = 20;                       
  }
  onChange(){
    alert(this.producto + "producto");
  }
}
