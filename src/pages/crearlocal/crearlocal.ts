import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  LoadingController, 
  Loading, 
  AlertController,
  MenuController, 
  NavParams,
  ViewController,
  App } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { HomePage } from '../home/home';
@IonicPage()
@Component({
  selector: 'page-crearlocal',
  templateUrl: 'crearlocal.html',
})
export class CrearlocalPage {
  public createForm:FormGroup;
  public loading:Loading;
  uid = firebase.auth().currentUser.uid;
  nombre = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public afDatabase: AngularFireDatabase, 
    public afAuth: AngularFireAuth, public menuCtrl: MenuController,
    public viewCtrl: ViewController, public app: App) {
    
    if(!this.navParams.get('cardID')){
      this.createForm = formBuilder.group({
        nombre: ['', Validators.compose([Validators.minLength(6), Validators.required])],
        descrip: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      });

    }else{
      firebase.database().ref('locales/' + this.navParams.get('cardID') ).on('value', data =>{
        if(data.val() != null ){
          
          this.createForm = formBuilder.group({
            nombre: [data.val().tutoriaName, Validators.compose([Validators.minLength(6), Validators.required])],
            descrip: [data.val().descripcion, Validators.compose([Validators.minLength(6), Validators.required])],
          });
        }

      });
    
    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  createCard(){
    if (!this.createForm.valid){
      console.log(this.createForm.value);
    } else {
      const value = this.createForm.value;
      firebase.database().ref('users/' + this.uid).on('value', data => {
        this.nombre = data.val().name + " " + data.val().lastname;
      });
      firebase.database().ref('locales/' + this.uid +'@'+ value.nombre).set({
        localid: this.uid,
        usernameName: this.nombre,
        nombrelocal: value.nombre,
        descripcion: value.descrip,
        email: firebase.auth().currentUser.email
      });

      if(this.navParams.get('cardID')){
        firebase.database().ref('locales/' + this.navParams.get('cardID') ).on('value', data =>{
          if(data.val() != null ){
            if(this.navParams.get('cardID') != this.uid +'@'+ value.nombre){
              firebase.database().ref('locales/'+this.navParams.get('cardID')).remove();
            }
          }
        });
      }
    
      //this.navCtrl.popToRoot();
      this.viewCtrl.dismiss();
      this.app.getRootNav().setRoot(HomePage);
    }
  }
}
