import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { Recipe } from '../../models/recipes.model';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { ShoppingListService } from '../../services/shopping-list.service';
import { RecipesService } from '../../services/recipes.service';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
  private recipe: Recipe;
  private index: number;
  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    private shopService: ShoppingListService,
    private recipeService: RecipesService) {
  }

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  private onEditRecipe = () => this.navCtrl.push(EditRecipePage, { mode: 'Edit', recipe: this.recipe, index: this.index});

  private onAddIngredients = () => this.shopService.addItems(this.recipe.ingredients);

  private onDeleteRecipe() {
    this.recipeService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }
}
