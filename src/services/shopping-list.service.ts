import { Injectable } from "@angular/core";
import { Ingredient } from "../models/ingredient.model";

@Injectable()
export class ShoppingListService {

 private ingredients: Ingredient[] = [];

addToShoppingList = (name: string, amount: number) => this.ingredients.push(new Ingredient(name, amount));

addSeveralToShoppingList = (items: Ingredient[]) => this.ingredients.push(...items);

getShoppingList = () => [...this.ingredients];

removeFromShoppingList = (index: number) => this.ingredients.splice(index, 1);
}
