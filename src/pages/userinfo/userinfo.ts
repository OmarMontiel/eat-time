import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { Userinfo } from '../../models/userinfo';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database'

@IonicPage()
@Component({
  selector: 'page-userinfo',
  templateUrl: 'userinfo.html',
})
export class UserinfoPage {

  userinfo = {} as Userinfo;
  
    constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase) {}
  
    createProfile(){
      this.afAuth.authState.subscribe(auth =>{
        this.afDatabase.object(`users/${auth.uid}`).set(this.userinfo).then(() => this.navCtrl.setRoot(HomePage));
      });
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad UserinfoPage');
    }
  }
