import { Recipe } from '../models/recipes.model';
import { Ingredient } from '../models/ingredient.model';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [];

  addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipes.push(new Recipe(title, description, difficulty, ingredients));
  }

  getRecipes = () => [...this.recipes];

  updateRecipe(index: number, title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
  }

  removeRecipe = (index: number) => this.recipes.splice(index, 1);
}
