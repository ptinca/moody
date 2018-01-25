import { Component } from '@angular/core';
import { NavController, App, Tabs } from 'ionic-angular';

import { DatabaseProvider } from '../../providers/database/database'

@Component({
  selector: 'page-addnew',
  templateUrl: 'addnew.html'
})
export class AddNewPage {

  feeling: number = 5;
  anxiety: number = 0;
  notes: string;

  constructor(public navCtrl: NavController, public appCtrl: App, private database: DatabaseProvider) {

  }

  addNewRecord(event) {
    const tabsNav = this.appCtrl.getNavByIdOrName('tabsNav') as Tabs;

    this.database.setMood(this.feeling, this.anxiety, this.notes).then((data) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    });

    this.feeling = 5;
    this.anxiety = 0;

    tabsNav.select(0);
  }

}
