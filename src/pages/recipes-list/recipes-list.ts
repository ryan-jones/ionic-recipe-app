import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RecipePage } from '../recipe/recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipesService } from '../../services/recipes.service';
import { Recipe } from '../../models/recipes.model';

@Component({
  selector: 'page-recipes-list',
  templateUrl: 'recipes-list.html'
})
export class RecipesListPage {
  recipes: Recipe[];
  constructor(public navCtrl: NavController, private recipesService: RecipesService) {}

  ionViewWillEnter() {
    this.recipes = this.recipesService.getRecipes();
  }
  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'New'});
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, { recipe, index });
  }
}
