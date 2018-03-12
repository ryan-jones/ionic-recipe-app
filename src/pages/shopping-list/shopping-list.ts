import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../models/ingredient.model';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {
  private listItems: Ingredient[];

  constructor(private shoppingService: ShoppingListService) {}

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.shoppingService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onCheckItem(index: number) {
    this.shoppingService.removeItem(index);
    this.loadItems();
  }

  private loadItems = () => this.listItems = this.shoppingService.getItems();
}
