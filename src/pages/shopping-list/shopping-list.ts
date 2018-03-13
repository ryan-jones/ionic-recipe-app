import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../models/ingredient.model';
import { PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { DBOptionsPage } from '../db-options/shopping-options';
import { DBOptionsService } from '../../services/db-opts.service';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage implements OnInit {
  private listItems: Ingredient[];

  constructor(
    private shoppingService: ShoppingListService,
    private dbService: DBOptionsService) {}

  ionViewWillEnter() {
    this.loadItems();
  }

  ngOnInit() {
    this.subscribeToListItems();
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

  private subscribeToListItems() {
    this.shoppingService.$listItems.subscribe(items => this.listItems = items)
  }

  private onShowOptions(event: MouseEvent) {
    this.dbService.onShowOptions(event, 'shopping-list');
  }
}
