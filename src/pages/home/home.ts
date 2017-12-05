import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, Tabs, NavParams } from 'ionic-angular';

import firebase from 'firebase/app';

import { VistaPage } from  '../vista/vista';
import { AddlocalPage } from  '../addlocal/addlocal';
import {ProfilePage} from '../profile/profile';
import {FavoritosPage} from '../favoritos/favoritos'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public myPhotoURL: any;
  @ViewChild("paymentTabs") paymentTabs: Tabs;
  cardsRoot = VistaPage;
  addRoot = AddlocalPage;
  Profile=ProfilePage;
  Favoritos= FavoritosPage;

  shouldHide = false;
  uid = firebase.auth().currentUser.uid;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController,
  public navParams: NavParams) {

    firebase.database().ref('users/' + this.uid).on('value', data =>{
      if(data.val() != null){
        data.val().tutor;
        if(data.val().tutor == true){
          this.shouldHide = true;
        }
      }
    });

    this.menuCtrl.enable(true, 'menu');

    if(this.navParams.get("cardName") != null){
      this.navCtrl.push(VistaPage, {
        cardName : this.navParams.get('cardName')
      });
    }
  }

  ionViewDidEnter(){
    //console.log("home");
  }
}
