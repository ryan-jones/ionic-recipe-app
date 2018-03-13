import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') navEl: NavController;
  private rootPage: any = TabsPage;
  private signinPage: any = SigninPage;
  private signupPage: any = SignupPage;
  isAuthenticated = false;

  constructor(platform: Platform, private menuCtrl: MenuController, private authService: AuthService) {
    this.initializeAndAuthenticate();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    });
  }

  initializeAndAuthenticate() {
    firebase.initializeApp({
      apiKey: "AIzaSyD0x_sxOXiD957_EUJIG0qqfS9-sUAY4LQ",
      authDomain: "ionic-shopping-list-a7099.firebaseapp.com",
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this.rootPage = TabsPage;
      } else {
        this.isAuthenticated = false;
        this.rootPage = SigninPage;      }
    });
  }

  private onLoad(page: any): void {
    this.navEl.setRoot(page);
    this.menuCtrl.close();
  }

  private onLogout = () => {
    this.authService.logout();
    this.menuCtrl.close();
    this.navEl.setRoot(SigninPage);
  }
}
