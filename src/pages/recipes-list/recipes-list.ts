import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RecipePage } from '../recipe/recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';

@Component({
  selector: 'page-recipes-list',
  templateUrl: 'recipes-list.html'
})
export class RecipesListPage {
  constructor(public navCtrl: NavController) {}

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'new'});
  }
}
