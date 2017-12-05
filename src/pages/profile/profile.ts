import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Camera } from 'ionic-native';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userinfo = {
    name: "",
    lastname: "",
    email: ""
  }

  user = firebase.auth().currentUser;
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    afAuth: AngularFireAuth) {
  

    if(this.user != null){
      
      firebase.database().ref(`users/` + this.user.uid).on('value', data => {
        if(data.val() != null){
          this.userinfo.name = data.val().name;
          this.userinfo.lastname = data.val().lastname;
          this.userinfo.email = this.user.email;
        }else{
          this.userinfo.name = "";
          this.userinfo.lastname = "";
          this.userinfo.email = "";
        }
      })
    }
  }

}
