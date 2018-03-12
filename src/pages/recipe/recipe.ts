import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { Recipe } from '../../models/recipes.model';
import { EditRecipePage } from '../edit-recipe/edit-recipe';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
  private recipe: Recipe;
  private index: number;
  constructor(public navParams: NavParams, public navCtrl: NavController) {
  }

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'Edit', recipe: this.recipe, index: this.index});
  }
}
