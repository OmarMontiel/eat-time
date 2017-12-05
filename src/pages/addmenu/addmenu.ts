import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController,ModalController,Loading } from 'ionic-angular';

import {CrearmenuPage} from '../crearmenu/crearmenu';
import firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-addmenu',
  templateUrl: 'addmenu.html',
})
export class AddmenuPage {
  public loading:Loading;
  uid = firebase.auth().currentUser.uid;
  card = {nombre: "", nombremenu: "",preciomenu : ""};
  cards =[];
  nombre ='';
  idCard: any;
  
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public app: App, public viewCtrl: ViewController,public modalCtrl: ModalController) {  
     
    var nombrelocal = this.uid+'@'+this.navParams.get('cardNombre');
    console.log(nombrelocal);
    
    firebase.database().ref('locales/'+nombrelocal+'/Menu').on('value', data => {
      if(data.val() != null){
      var datos = data.val();
      var keys = Object.keys(datos)

      for(var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var datalocal = datos[k];
        //console.log(datalocal.email);
        this.cards.push({
          nombremenu : datalocal.nombremenu,
          precio : datalocal.preciomenu
        });
        
      } // fin primer for
    }
    }, error =>{
      this.idCard = "";
      this.card.nombre = "";
      this.card.nombremenu = "";
      
    });

    /// fin 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddmenuPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  createTutoria(){
    let addModal = this.modalCtrl.create(CrearmenuPage);
    addModal.present();
  }
  
  irpagina(nombre: string){
    nombre = this.navParams.get('cardNombre');
    console.log('to crearmenu'+ nombre);
    let cardview = this.modalCtrl.create(CrearmenuPage, {cardNombre: nombre});
    cardview.present();
  }
}
