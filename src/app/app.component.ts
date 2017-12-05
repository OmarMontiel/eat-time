import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// paginas
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { AuthProvider } from '../providers/auth/auth';

//base de datos
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;
  pages: Array<{name: string, icon: string, component: any}>
  user = firebase.auth().currentUser;
  userinfo = {
    lastname: "",
    name: "",
    ventetor: ""
  }
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth,
    public afAuthProvider: AuthProvider) {

      const authObserver = afAuth.authState.subscribe(user => {
        if(user){
          this.rootPage = HomePage;
          authObserver.unsubscribe();
        } else {
          
          this.rootPage = 'HomesinregistroPage';
          authObserver.unsubscribe();
        }
      });    

    // used for an example of ngFor and navigation
    this.pages = [
      { name: 'Home', icon: 'home', component: HomePage },
      { name: 'Profile', icon: 'person', component: ProfilePage }
    ]

  }

  /*
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    */
    openPage(page){
      this.nav.setRoot(page.component);
    }
  
    logoutUser(){
      this.afAuthProvider.logoutUser();
      this.nav.setRoot('HomesinregistroPage');
    } 
}

