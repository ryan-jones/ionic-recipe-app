import { Component } from '@angular/core';

import { ShoppingListPage } from '../shopping-list/shopping-list';
import { RecipesListPage } from '../recipes-list/recipes-list';
import { EditRecipePage } from '../edit-recipe/edit-recipe';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ShoppingListPage;
  tab2Root = RecipesListPage;
  tab3Root = EditRecipePage;

  constructor() {

  }
}
