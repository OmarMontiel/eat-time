import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  LoadingController, 
  Loading, 
  AlertController,
  NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm:FormGroup;
  public loading:Loading;

  tutor: boolean;
  user = { name: "", lastname: ""}

  constructor(public nav: NavController, public authData: AuthProvider, 
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController, public afDatabase: AngularFireDatabase, 
    public afAuth: AngularFireAuth, public navParams: NavParams) {

    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
    });

  }

 

  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {


      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password).then(() => {
        this.afAuth.authState.subscribe(user =>{
          this.afDatabase.object(`users/${user.uid}`).set(this.user)
        });

        if(this.navParams.get("cardName") != null){
          this.nav.setRoot(LoginPage, {
            cardName : this.navParams.get('cardName')
          });
        }else{
          this.nav.setRoot(LoginPage);
        }
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
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
}