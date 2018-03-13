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

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ShoppingListPage,
    RecipePage,
    RecipesListPage,
    EditRecipePage,
    SigninPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
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
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShoppingListService,
    RecipesService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
