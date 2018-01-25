import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

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
      console.log('dbb creee');
      this.db = db;
      this.db.executeSql('CREATE TABLE IF NOT EXISTS mood(id INTEGER PRIMARY KEY AUTOINCREMENT, feeling INTEGER, anxiety INTEGER, notes TEXT)', {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  public setMood(feeling: number, anxiety:number, notes:string){
    return new Promise ((resolve, reject) => {
      let sql = "INSERT INTO mood (feeling, anxiety, notes) VALUES (?, ?, ?)";
      this.db.executeSql(sql, [feeling, anxiety, notes]).then((data) =>{
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  public getMood() {
    return new Promise ((resolve, reject) => {
      this.db.executeSql('SELECT * FROM mood', {})
      .then((data) => {
        if(data == null) { return; }

        let mood = {};

        if(data.rows) {
          if(data.rows.length > 0) {
            for(var i = 0; i < data.rows.length; i++) {
              mood[data.rows.item(i).id] = {
                'feeling': data.rows.item(i).feeling,
                'anxiety': data.rows.item(i).anxiety
              }
            }
          }
        }

        resolve(mood);
      }, (error) => {
        reject(error);
      });
    });
  }

  // GetAllUsers(){
  //   return new Promise ((resolve, reject) => {
  //     this.db.executeSql("SELECT * FROM users", []).then((data) => {
  //       let arrayUsers = [];
  //       if (data.rows.length > 0) {
  //         for (var i = 0; i < data.rows.length; i++) {
  //           arrayUsers.push({
  //             id: data.rows.item(i).id,
  //             identification: data.rows.item(i).identification,
  //             name: data.rows.item(i).name,
  //             lastname: data.rows.item(i).lastname
  //           });            
  //         }          
  //       }
  //       resolve(arrayUsers);
  //     }, (error) => {
  //       reject(error);
  //     })
  //   })
  // }

}