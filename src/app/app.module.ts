import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { RecipePage } from '../pages/recipe/recipe';
import { RecipesListPage } from '../pages/recipes-list/recipes-list';
import { EditRecipePage } from '../pages/edit-recipe/edit-recipe';
import { ShoppingListService } from '../services/shopping-list.service';
import { RecipesService } from '../services/recipes.service';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http'
import { DBOptionsPage } from '../pages/db-options/shopping-options';
import { DBOptionsService } from '../services/db-opts.service';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ShoppingListPage,
    RecipePage,
    RecipesListPage,
    EditRecipePage,
    SigninPage,
    SignupPage,
    DBOptionsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ShoppingListPage,
    RecipePage,
    RecipesListPage,
    EditRecipePage,
    SigninPage,
    SignupPage,
    DBOptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShoppingListService,
    RecipesService,
    AuthService,
    DBOptionsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
