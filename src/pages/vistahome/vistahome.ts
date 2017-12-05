import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController,ModalController,Loading  } from 'ionic-angular';

import firebase from 'firebase';
import { FavoritosPage } from '../favoritos/favoritos';

@IonicPage()
@Component({
  selector: 'page-vistahome',
  templateUrl: 'vistahome.html',
})
export class VistahomePage {
  public loading:Loading;
  uid = firebase.auth().currentUser.uid;
  card = {nombre: "", nombremenu: "",preciomenu : ""};
  cards =[];
  nombre ='';
  idCard: any;
  fav = { nombremenu:"", preciomenu:""};

  id ='99R7adG8WaQ2kBiy1sIYvCCjjsE3'
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public app: App, public viewCtrl: ViewController,public modalCtrl: ModalController) { 
  
    var nombrelocal = this.id+'@'+this.navParams.get('cardNombre');
    console.log(nombrelocal);
    
    firebase.database().ref('locales/'+nombrelocal+'/Menu').on('value', data => {
      if(data.val() != null){
      var datos = data.val();
      var keys = Object.keys(datos)

      for(var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var datalocal = datos[k];
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
      this.card.preciomenu="";
      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VistahomePage');
  }
  
  closeModal() {
    this.viewCtrl.dismiss();
  }

}
