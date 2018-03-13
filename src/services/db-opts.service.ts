import { LoadingController, PopoverController, AlertController } from "ionic-angular";
import { DBOptionsPage } from "../pages/db-options/shopping-options";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { ShoppingListService } from "./shopping-list.service";
import { Ingredient } from "../models/ingredient.model";
import { HttpClient } from "@angular/common/http";
import { RecipesService } from "./recipes.service";
import { Recipe } from "../models/recipes.model";

@Injectable()
export class DBOptionsService {

  constructor(
    private loadingCtrl: LoadingController,
    private popCtrl: PopoverController,
    private authService: AuthService,
    private shoppingService: ShoppingListService,
    private alertCtrl: AlertController,
    private http: HttpClient,
    private recipeService: RecipesService) {}

  public onShowOptions(event: MouseEvent, list: string) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    const popover = this.popCtrl.create(DBOptionsPage);
    popover.present({ ev: event });
    popover.onDidDismiss(data => {
      if (!data) {
        return;
      }
      loading.present()
      this.storeOrFetch(data, list, loading);
    })
  }


  private storeOrFetch(data: any, list: string, loading: any) {
    this.authService.getActiveUser().getToken()
      .then((token: string) => data.action === 'load' ? this.fetchList(token, list, loading) : this.storeList(token, list, loading))
      .catch(error => this.handleError(error.error));
  }


  private storeList(token: string, list: string, loading: any) {
    const userId = this.authService.getActiveUser().uid;
    list === 'shopping-list' ? this.storeShoppingList(token, userId, list, loading) : this.storeRecipes(token, userId, list, loading);
  }

  private fetchList(token: string, list: string, loading: any) {
    const userId = this.authService.getActiveUser().uid;
    list === 'shopping-list' ? this.fetchShoppingList(token, userId, list, loading) : this.fetchRecipes(token, userId, list, loading);
  }

  private storeShoppingList(token: string, userId: string, list: string, loading: any) {
    const ingredients = this.shoppingService.ingredients;
    this.http.put(`https://ionic-shopping-list-a7099.firebaseio.com/${userId}/${list}.json?auth=${token}`, ingredients).subscribe(
      () => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Success!',
          buttons: ['Wonderful']
        })
      },
      error => {
        this.handleError(error.error);
      }
    )
  }

  private storeRecipes(token: string, userId: string, list: string, loading: any) {
    const recipes = this.recipeService.recipes;
    this.http.put(`https://ionic-shopping-list-a7099.firebaseio.com/${userId}/${list}.json?auth=${token}`, recipes).subscribe(
      () => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Success!',
          buttons: ['Wonderful']
        })
      },
      error => {
        this.handleError(error.error);
      }
    )
  }

  private fetchShoppingList(token: string, userId: string, list: string, loading: any) {
    this.http.get(`https://ionic-shopping-list-a7099.firebaseio.com/${userId}/${list}.json?auth=${token}`).subscribe(
      (list: Ingredient[]) => {
        loading.dismiss();
        if (list) {
          this.shoppingService.setFetchedShoppingList(list);
        }
      },
      error => {
        loading.dismiss();
        this.handleError(error.error);
      }
    )
  }

  private fetchRecipes(token: string, userId: string, list: string, loading: any) {
    this.http.get(`https://ionic-shopping-list-a7099.firebaseio.com/${userId}/${list}.json?auth=${token}`).subscribe(
      (recipes: Recipe[]) => {
        loading.dismiss();
        if (recipes) {
          recipes.forEach(recipe => {
            if (!recipe.hasOwnProperty('ingredients')) {
              recipe.ingredients = [];
            }
          });
          this.recipeService.setFetchedRecipes(recipes);
        }
      },
      error => {
        loading.dismiss();
        this.handleError(error.error);
      }
    )
  }


  private handleError(error: string) {
    console.log('error', error);
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: error,
      buttons: ['ok']
    });
    alert.present();
  }
}
