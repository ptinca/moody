import { Component, ViewChild } from '@angular/core';
import { NavController, App, Tabs } from 'ionic-angular';
import * as moment from 'moment';

import { DatabaseProvider } from '../../providers/database/database'

@Component({
  selector: 'page-addnew',
  templateUrl: 'addnew.html',
})
export class AddNewPage {

  mood: number = 5;
  anxiety: number = 0;
  notes: string;
  display_date: string = moment().format('MMM D, YYYY');
  date: string = moment().format('YYYY-MM-DDTHH:mm');

  @ViewChild('datePicker') datePicker;

  constructor(public navCtrl: NavController, public appCtrl: App, private database: DatabaseProvider) {
  }

  selectedDate(date) {
    date.month = date.month - 1;
    this.display_date = moment(date).format('MMM D, YYYY');
  };

  addNewRecord(event) {
    const tabsNav = this.appCtrl.getNavByIdOrName('tabsNav') as Tabs;
    
    this.date = moment(this.date).format('YYYY-MM-DDTHH:mm');
    this.database.setMood(this.date, this.mood, this.anxiety, this.notes).then((data) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    });

    // Reset values after mood is added to DB.
    this.display_date = moment().format('MMM D, YYYY');
    this.mood = 5;
    this.anxiety = 0;
    this.notes = '';

    tabsNav.select(0);
  }

}
