import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";

@Component({
  selector: 'page-db-options',
  template: `
    <ion-grid text-center>
      <ion-row>
        <ion-col>
          <h3>Store & Load</h3>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <button (click)="onAction('load')" ion-button outline>Load List</button>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <button (click)="onAction('store')" ion-button outline>Save List</button>
        </ion-col>
      </ion-row>
    </ion-grid>
  `
})
export class DBOptionsPage {

  constructor(private viewCtrl: ViewController) {}

  onAction(action: string) {
    this.viewCtrl.dismiss({action});
  }
}
