import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { ProductoServiceProvider } from '../../providers/producto-service/producto-service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,private http: HTTP,private productoService : ProductoServiceProvider) {
    this.presentToast()
    alert (this.productoService.getPrueba());
  }
  productos;
  total;
  sucursales = [];
  weather = [];
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000
    });
    toast.present();
  }
  probar(){
    alert("probar");
    let params = {
      string:"coca",
      lat:"-34.6012424",
      lng:"-58.377395",
      limit:10
    }
    var re;
        re = this.productoService.getProductos(params);
        re.then(
          resolved => this.productos = (resolved),
          error => alert(error),
          alert(this.productos)
        );
        alert(this.productos);

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
         alert(this.total);
       })
     .catch(error => {
             alert(error); // Error message
           });

           let parametros2 = {
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
             });     
  }
}
