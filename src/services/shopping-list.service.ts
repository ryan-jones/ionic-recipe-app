import { Ingredient } from '../models/ingredient.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShoppingListService {
  public ingredients: Ingredient[] = [];
  public $listItems: Subject<Ingredient[]> = new Subject<Ingredient[]>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  addItem = (name: string, amount: number) => this.ingredients.push(new Ingredient(name, amount));

  addItems = (items: Ingredient[]) => this.ingredients.push(...items);

  getItems = () => [...this.ingredients];

  removeItem = (index: number) => {
    this.ingredients.splice(index, 1)
  };



  setFetchedShoppingList(list: Ingredient[]) {
    this.ingredients = list;
    this.$listItems.next(list);
  }
}
