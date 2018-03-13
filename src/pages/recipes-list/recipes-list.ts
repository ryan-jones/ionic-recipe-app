import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RecipePage } from '../recipe/recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipesService } from '../../services/recipes.service';
import { Recipe } from '../../models/recipes.model';
import { DBOptionsService } from '../../services/db-opts.service';

@Component({
  selector: 'page-recipes-list',
  templateUrl: 'recipes-list.html'
})
export class RecipesListPage implements OnInit {
  recipes: Recipe[];
  constructor(public navCtrl: NavController, private recipesService: RecipesService, private dbService: DBOptionsService) {}

  ionViewWillEnter() {
    this.recipes = this.recipesService.getRecipes();
  }

  ngOnInit() {
    this.recipesService.$recipes.subscribe(recipes => this.recipes = recipes);
  }

  private onShowOptions(event: MouseEvent) {
    this.dbService.onShowOptions(event, 'recipes');
  }

  private onNewRecipe() {
    this.navCtrl.push(EditRecipePage);
  }

  onLoadRecipe = (recipe: Recipe, index: number) => this.navCtrl.push(RecipePage, { recipe, index });
}
