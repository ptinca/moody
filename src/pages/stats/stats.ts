import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html'
})
export class StatsPage {

  constructor(public navCtrl: NavController, navParams: NavParams) {
    console.log('Passed params', navParams.data);
  }

}
