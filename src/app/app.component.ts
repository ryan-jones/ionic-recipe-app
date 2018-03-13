import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') navEl: NavController;
  private tabsPage: any = TabsPage;
  private signinPage: any = SigninPage;
  private signupPage: any = SignupPage;
  constructor(platform: Platform, private menuCtrl: MenuController) {
    firebase.initializeApp({
      apiKey: "AIzaSyD0x_sxOXiD957_EUJIG0qqfS9-sUAY4LQ",
      authDomain: "ionic-shopping-list-a7099.firebaseapp.com",
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    });
  }

  private onLoad(page: any): void {
    this.navEl.setRoot(page);
    this.menuCtrl.close();
  }
}
