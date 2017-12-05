import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController } from 'ionic-angular';
import firebase from 'firebase';
import { HomePage } from '../home/home';
import { CrearlocalPage } from '../crearlocal/crearlocal';

@IonicPage()
@Component({
  selector: 'page-editlocal',
  templateUrl: 'editlocal.html',
})
export class EditlocalPage {

  
  card = {nombre: "", descripcion: ""};
  idCard: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public app: App, public viewCtrl: ViewController) {
    //console.log(navParams.get('cardNombre'));

    firebase.database().ref('locales/').on('value', data => {
      if(data.val() != null){
      var datos = data.val();
      var keys = Object.keys(datos)

      for(var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var datalocal = datos[k];

        if(datalocal.nombrelocal == navParams.get('cardNombre') ){
          this.idCard = keys[i];
          this.card.nombre = datalocal.nombrelocal;
          this.card.descripcion = datalocal.descripcion;
        }
      }
    }
    }, error =>{
      this.idCard = "";
      this.card.nombre = "";
      this.card.descripcion = "";
    });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  deleteCard(){
    firebase.database().ref('locales/'+this.idCard).remove();
    this.viewCtrl.dismiss();
    this.app.getRootNav().setRoot(HomePage);
  }

  editCard(){
    this.navCtrl.push(CrearlocalPage, {
      cardID : this.idCard
    });
  }
}
