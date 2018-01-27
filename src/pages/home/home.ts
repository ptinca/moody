import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';

import { DatabaseProvider } from '../../providers/database/database'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('lineCanvas') lineCanvas;

  public lineChart: any;
  public moodsChart: any;
  public moodsList: Array<any>;

  constructor(public navCtrl: NavController, private database: DatabaseProvider) {
  }

  ionViewWillEnter() {
    this.database.getMood().then((data) => {
      this.moodsChart = data['moods'];
      this.moodsList = data['moods_reverse'];
      this.makeChart();
    }, (error) => {
      console.log(error);
    });
  }

  public makeChart() {
    let current_date = '';
    let chartDates = [];
    let chartMood = [];
    let chartAnxiety = [];

    if(this.moodsChart.length > 0) {
      for(var i = 0; i < this.moodsChart.length; i++) {
        current_date = this.moodsChart[i]['date'];
        chartDates.push(current_date);
        chartMood.push(this.moodsChart[i]['mood']);
        chartAnxiety.push(this.moodsChart[i]['anxiety']);
      }
    }

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: chartDates, // dates
        datasets: [
          {
            label: "Mood",
            lineTension: 0.3,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            data: chartMood, // data
          },
          {
            label: "Anxiety",
            lineTension: 0.3,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            data: chartAnxiety, // data
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20
          }
        }
      }
    });
  }
}
