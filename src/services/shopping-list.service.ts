import { Ingredient } from '../models/ingredient.model';

export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  addItem = (name: string, amount: number) => this.ingredients.push(new Ingredient(name, amount));

  addItems = (items: Ingredient[]) => this.ingredients.push(...items);

  getItems = () => [...this.ingredients];

  removeItem = (index: number) => this.ingredients.splice(index, 1);
}
