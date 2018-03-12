import { Component, OnInit } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  AlertController,
  ToastController
} from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipesService } from '../../services/recipes.service';
import { Recipe } from '../../models/recipes.model';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})
export class EditRecipePage implements OnInit {
  private recipe: Recipe;
  private index: number
  private mode = 'New';
  private difficulties = ['Easy', 'Medium', 'Hard'];
  private recipeForm: FormGroup;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    private actionCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private recipesService: RecipesService
  ) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode === 'Edit') {
      [this.recipe, this.index] = [this.navParams.get('recipe'), this.navParams.get('index')];
    }
    this.initializeForm();
  }

  private initializeForm() {
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if (this.mode === 'Edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      this.recipe.ingredients.forEach(ingredient => ingredients.push(new FormControl(ingredient.name, Validators.required)))
    }
    this.recipeForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      description: new FormControl(description, Validators.required),
      difficulty: new FormControl(difficulty, Validators.required),
      ingredients: new FormArray(ingredients)
    });
  }

  private onSubmit() {
    const value = this.recipeForm.value;
    const ingredients = value.ingredients.length ? value.ingredients.map(name => ({ name: name, amount: 1 })) : [];
    this.mode === 'Edit'
    ?
      this.recipesService.updateRecipe(this.index, value.title, value.description, value.difficulty, ingredients)
    :
      this.recipesService.addRecipe(value.title, value.description, value.difficulty, ingredients);

    this.navCtrl.popToRoot();
  }

  private onManageIngredients() {
    const actionSheet = this.actionCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add ingredients',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove all ingredients',
          handler: () => this.deleteAllIngredients(),
          role: 'destructive'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => this.checkForData(data)
        }
      ]
    });
  }

  checkForData(data: any) {
    if (!data.name.trim()) {
      const toast = this.createToast('Please enter a valid value', 2000, 'top');
      toast.present();
    } else {
      (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
      const toast = this.createToast('Item added!', 2000, 'bottom');
      toast.present();
    }
  }

  deleteAllIngredients() {
    const formArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
    const len = formArray.length;
    if (len > 0) {
      for (let i = len; i >= 0; i--) {
        formArray.removeAt(i);
      }
    }
    const toast = this.createToast('All Ingredients Deleted', 2000, 'top');
    toast.present();
  }

  createToast(message: string, duration:number, position: string) {
    return this.toastCtrl.create({
      message,
      duration,
      position
    });
  }
}
