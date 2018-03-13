import { Recipe } from '../models/recipes.model';
import { Ingredient } from '../models/ingredient.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipesService {
  public recipes: Recipe[] = [];
  public $recipes: Subject<Recipe[]> = new Subject<Recipe[]>();

  addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipes.push(new Recipe(title, description, difficulty, ingredients));
  }

  getRecipes = () => [...this.recipes];

  updateRecipe(index: number, title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
  }

  removeRecipe = (index: number) => this.recipes.splice(index, 1);

  setFetchedRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.$recipes.next(recipes);
  }
}
