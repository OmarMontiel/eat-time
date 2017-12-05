import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController,Loading } from 'ionic-angular';

import firebase from 'firebase';

import {VistahomePage} from '../vistahome/vistahome'

/**
 * Generated class for the VistaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vista',
  templateUrl: 'vista.html',
})
export class VistaPage {
  public loading:Loading;
  
  uid = firebase.auth().currentUser.uid;
  cards = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public menuCtrl: MenuController, public modalCtrl: ModalController) {

    firebase.database().ref('locales/').on('value', data => {
      if(data.val() != null){
      var datos = data.val();
      var keys = Object.keys(datos)
      for(var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var datalocal = datos[k];

        this.cards.push(
          {
            nombre : datalocal.nombrelocal,
            descripcion : datalocal.descripcion,
          }
        );
      
      }
    }
    }, error =>{
      this.cards.push(
        {
        nombre : "",
          descripcion : "",
        }
      );
    });
    if(this.navParams.get('cardName') != null){
      this.viewCard(this.navParams.get('cardName'));
    }
  }

  viewCard(nombre: string){
    console.log('to crearmenu'+ nombre);
    let cardview = this.modalCtrl.create(VistahomePage, {cardNombre: nombre});
    cardview.present();
  }

}
