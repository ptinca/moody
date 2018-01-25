import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AddNewPage } from '../addnew/addnew';
import { StatsPage } from '../stats/stats';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeRoot = HomePage;
  addNewRoot = AddNewPage;
  statsRoot = StatsPage;

  statsParams = {
    user1: 'admin',
    user2: 'ionic'
  };

  constructor() {

  }
}
