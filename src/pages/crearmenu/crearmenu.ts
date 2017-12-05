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
  selector: 'page-crearmenu',
  templateUrl: 'crearmenu.html',
})
export class CrearmenuPage {
  public createForm:FormGroup;
  public loading:Loading;
  uid = firebase.auth().currentUser.uid;
  nombre = "";
  menu="";

 

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public afDatabase: AngularFireDatabase, 
    public afAuth: AngularFireAuth, public menuCtrl: MenuController,
    public viewCtrl: ViewController, public app: App) {

      console.log(this.navParams.get('cardNombre')+" crear menu");
     
        
         firebase.database().ref('locales/' ).on('value', data =>{
            if(data.val() != null ){
        
               this.createForm = formBuilder.group({
                nombre: [data.val().nombremenu, Validators.compose([Validators.minLength(6), Validators.required])],
                descrip: [data.val().descripcion, Validators.compose([Validators.minLength(6), Validators.required])],
                preciomenu: [data.val().preciomenu, Validators.compose([Validators.minLength(6), Validators.required])],
                  });
             }
        
          });
           }
  //}
  closeModal() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearmenuPage');
  }

  createCard(){
    if (!this.createForm.valid){
      console.log(this.createForm.value);
    } else {
      const value = this.createForm.value;
      console.log(this.createForm.value);
      firebase.database().ref('users/' + this.uid).on('value', data => {
        this.nombre = data.val().name + " " + data.val().lastname;

      });
      var id=Date.now();//this.navParams.get('cardNombre')+
      firebase.database().ref('locales/' + this.uid +'@'+this.navParams.get('cardNombre')+'/'+'Menu/'+id).set({
        localid: this.uid,
        nombremenu: value.nombre,
        ingretientes: value.descrip,
        preciomenu: value.preciomenu,
        email: firebase.auth().currentUser.email,
      });
/*
      if(this.navParams.get('cardID')){
        firebase.database().ref('locales/' + this.navParams.get('cardID')+'/'+'Menu/'+this.uid).on('value', data =>{
          if(data.val() != null ){
            if(this.navParams.get('cardID') != this.uid +'@'+ value.nombre){
              firebase.database().ref('locales/'+this.navParams.get('cardID')+'/'+'Menu/'+this.uid).remove();
            }
          }
        });
      }
    */
      //this.navCtrl.popToRoot();
      this.viewCtrl.dismiss();
      this.app.getRootNav().setRoot(HomePage);
    }
    
  
  
  }
  
  

}
