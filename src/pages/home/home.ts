import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { ToastController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { Geolocation } from '@ionic-native/geolocation';
import { ProductoServiceProvider } from '../../providers/producto-service/producto-service'
import {VerProductoPage} from '../ver-producto/ver-producto';
import { producto } from '../../app/model/producto';
import { ZBar,ZBarOptions} from '@ionic-native/zbar';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    private http: HTTP,
    private geolocation: Geolocation,
    private productoService : ProductoServiceProvider,
    private zbar:ZBar,
    public storage: Storage,
    public loading:LoadingController,
    public statusBar : StatusBar
    ) {
    // set status bar to white
    this.statusBar.styleLightContent();
  }
  onInput(ev){
    alert("pepe");
  }
  producto;
  productos;
  total;
  sucursales = [];
  weather = [];
  ubicacion = 12;
  myInput;
  getProductByName(){
            let params = {
                string:"coca",
                lat:"-34.6012424",
                lng:"-58.377395",
                limit:10
                } 
            if(this.producto != "")
              {
                params.string = this.producto;
              }
            var re;
            re = this.productoService.getProductos(params);
            re.then(
                      resolved => this.productos = (resolved),
                      error => alert("error al buscar productos "+error)
                  );
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
                  enableHighAccuracy:false
                };         
            let val = this.geolocation.getCurrentPosition(options)
              .then((resp) => {
                    this.ubicacion = 1;
                    this.ubicacion = resp.coords.latitude;
                    alert("coordenadas: "+resp.coords.latitude);
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
  productoElegido(producto:producto){
    this.storage.set('id',producto.id); 
    this.navCtrl.push(VerProductoPage);
  }
  escanear(){
             let options: ZBarOptions = {
                     flash: 'off',
                     drawSight: false
                      };
              this.zbar.scan(options)
              .then(result => {
                    alert(result);
                    this.storage.set('id',result); 
                  })
              .catch((error) => {
                            if(error != "cancelled")
                              {
                                alert('Error scan: '+error);
                              }
                         });
       }
}
