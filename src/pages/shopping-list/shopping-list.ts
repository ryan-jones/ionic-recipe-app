import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../models/ingredient.model';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage implements OnInit {
  private shoppingListItems: Ingredient[];

  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit() {
    this.loadList();
  }
  onAddItem(form: NgForm) {
    this.shoppingService.addToShoppingList(
      form.value.ingredientName,
      form.value.ingredientAmount
    );
    this.loadList();
    form.reset();
  }

  private loadList() {
    this.shoppingListItems = this.shoppingService.getShoppingList();
  }

  private onDelete = (itemIndex: number) => {
    this.shoppingService.removeFromShoppingList(itemIndex);
    this.loadList();
  }

}
