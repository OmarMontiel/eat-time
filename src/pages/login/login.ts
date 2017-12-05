import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  LoadingController, 
  Loading, 
  AlertController,
  MenuController,
  NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { UserinfoPage } from '../userinfo/userinfo'

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loginForm:FormGroup;
  public loading:Loading;

  constructor(public navCtrl: NavController, public authData: AuthProvider, 
    public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public afDatabase: AngularFireDatabase, public afAuth: AngularFireAuth,
    public menuCtrl: MenuController, public navParams: NavParams) {

      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });

      this.menuCtrl.enable(false, 'menu');
      //console.log(this.navParams.get('cardName'));
  }

  loginUser(){
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then( authData => {

        this.afAuth.authState.subscribe(user => {
          firebase.database().ref(`users/${user.uid}/name`).on('value', snapshot=> {
            if(snapshot.val() == ""){
              this.navCtrl.setRoot(UserinfoPage, {
                cardName : this.navParams.get('cardName') 
              });
            } else {
              this.navCtrl.setRoot(HomePage, {
                cardName : this.navParams.get('cardName')
              });
            }
          })
        });

      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

  goToResetPassword(){
    this.navCtrl.push('ResetPasswordPage');
  }

  createAccount(){
    this.navCtrl.push('SignupPage');
  }
}
