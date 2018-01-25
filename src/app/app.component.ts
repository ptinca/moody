import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // this.sqlite = new SQLite();
      // this.sqlite.create({
      //   name: "moody.db",
      //   location: 'default'
      // }).then((db: SQLiteObject) => {
      //   // this.db = db;
      //   db.executeSql('CREATE TABLE IF NOT EXISTS mood(id INTEGER PRIMARY KEY AUTOINCREMENT, feeling INTEGER, anxiety INTEGER, notes TEXT)', {})
      //     .then(() => console.log('Executed SQL'))
      //     .catch(e => console.log(e));
      // }).catch(e => console.log(e));

    });
  }
}
