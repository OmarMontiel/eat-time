import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { EditlocalPage } from '../editlocal/editlocal';
import {CrearlocalPage} from '../crearlocal/crearlocal';
import {AddmenuPage} from '../addmenu/addmenu'

import firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-addlocal',
  templateUrl: 'addlocal.html',
})
export class AddlocalPage {

  cards = [];
  uid = firebase.auth().currentUser.uid;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public menuCtrl: MenuController, public modalCtrl: ModalController) {

    //this.menuCtrl.enable(true, 'menu');

    firebase.database().ref('locales/').on('value', data => {
      if(data.val() != null){
      var datos = data.val();
      var keys = Object.keys(datos)

      for(var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var datalocal = datos[k];

        if(datalocal.localid == this.uid){
          this.cards.push(
            {
              nombre : datalocal.nombrelocal,
              descripcion : datalocal.descripcion,
            }
          );
        }
        //console.log(this.cards);
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
  }

  createTutoria(){
    let addModal = this.modalCtrl.create(CrearlocalPage);
    addModal.present();
  }

  viewCard(nombre: string){
    //console.log(nombre);
    let cardview = this.modalCtrl.create(EditlocalPage, {cardNombre: nombre});
    cardview.present();
  }

  irpagina(nombre: string){
    //console.log(nombre);
    let cardview = this.modalCtrl.create(AddmenuPage, {cardNombre: nombre});
    cardview.present();
  }
  
}
