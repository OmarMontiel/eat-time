import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup';
import {ProfilePage} from '../pages/profile/profile';
import {VistaPage} from '../pages/vista/vista';
import {UserinfoPage} from '../pages/userinfo/userinfo';
import {AddlocalPage} from '../pages/addlocal/addlocal';
import {CrearlocalPage} from '../pages/crearlocal/crearlocal';
import {EditlocalPage} from '../pages/editlocal/editlocal';
import {AddmenuPage} from '../pages/addmenu/addmenu';

import {FavoritosPage} from '../pages/favoritos/favoritos';

import {CrearmenuPage} from '../pages/crearmenu/crearmenu';

import {VistahomePage} from '../pages/vistahome/vistahome';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

const firebaseConfig = {
  apiKey: "AIzaSyCr6xCUJk3pfMtihBAnATkt7R8YqT3Nx-g",
  authDomain: "ionictime.firebaseapp.com",
  databaseURL: "https://ionictime.firebaseio.com",
  projectId: "ionictime",
  storageBucket: "ionictime.appspot.com",
  messagingSenderId: "893201086290"
}; 

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ProfilePage,
    VistaPage,
    UserinfoPage,
    AddlocalPage,
    CrearlocalPage,
    VistahomePage,
    EditlocalPage,
    AddmenuPage,CrearmenuPage,
    FavoritosPage,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ProfilePage,
    VistaPage,
    UserinfoPage,
    AddlocalPage,
    CrearlocalPage,
    VistahomePage,
    EditlocalPage,
    AddmenuPage,CrearmenuPage,
    FavoritosPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
