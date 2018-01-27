import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import * as moment from 'moment';

@Injectable()
export class DatabaseProvider {

  private db: SQLiteObject;

  constructor(private platform: Platform, public sqlite: SQLite) {
    this.platform.ready().then(() => {
      this.createDB();
    }); 
  }

  private createDB(): void {
    this.sqlite.create({
      name: "moody.db",
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.db = db;
      this.db.executeSql('CREATE TABLE IF NOT EXISTS moods(id INTEGER PRIMARY KEY AUTOINCREMENT, date_selected TEXT, mood INTEGER, anxiety INTEGER, notes TEXT)', {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  public setMood(selected_date:string, mood:number, anxiety:number, notes:string){
    return new Promise ((resolve, reject) => {
      let sql = "INSERT INTO moods (date_selected, mood, anxiety, notes) VALUES (?, ?, ?, ?)";
      this.db.executeSql(sql, [selected_date, mood, anxiety, notes]).then((data) =>{
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  public getMood() {
    return new Promise ((resolve, reject) => {
      this.db.executeSql('SELECT * FROM moods ORDER BY date_selected ASC', {})
      .then((data) => {
        if(data == null) { return; }

        let moods: Array<any> = [];
        let moods_reverse: Array<any> = [];

        if(data.rows) {
          if(data.rows.length > 0) {
            for(var i = 0; i < data.rows.length; i++) {
              let moodObj = {
                'date': moment(data.rows.item(i).date_selected).format('D. M.'),
                'mood': data.rows.item(i).mood,
                'anxiety': data.rows.item(i).anxiety
              };

              moods.push(moodObj);
              moods_reverse.unshift(moodObj);
            }
          }
        }

        resolve({
          'moods': moods,
          'moods_reverse': moods_reverse
        });
      }, (error) => {
        reject(error);
      });
    });
  }
}
