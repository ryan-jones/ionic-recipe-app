import { Component, OnInit } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  AlertController
} from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})
export class EditRecipePage implements OnInit {
  private mode = 'New';
  private difficulties = ['Easy', 'Medium', 'Hard'];
  private recipeForm: FormGroup;
  constructor(
    public navParams: NavParams,
    private actionCtrl: ActionSheetController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      difficulty: new FormControl('Medium', Validators.required),
      ingredients: new FormArray([])
    });
  }

  private onSubmit() {}

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
          handler: () => {
            const formArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = formArray.length;
            if (len > 0) {
              for (let i = len; i >= 0; i--) {
                formArray.removeAt(i);
              }
            }

          },
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
          handler: data => {
            if (!data.name || data.name.trim() === '') {
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required))
          }
        }
      ]
    });

  }
}
