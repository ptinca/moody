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

  lineChart: any;
  moods: any;
  moodsKeys: any;

  constructor(public navCtrl: NavController, private database: DatabaseProvider) {
  }

  ionViewWillEnter() {
    this.database.getMood().then((data) => {
      this.moods = data;
      this.moodsKeys = Object.keys(data);
      this.makeChart();
    }, (error) => {
      console.log(error);
    });

  }

  public makeChart() {
    let moodData = [];

    if(this.moodsKeys.length > 0) {
      for(var i = 0; i < this.moodsKeys.length; i++) {
        moodData.push(this.moods[this.moodsKeys[i]]['feeling']);
      }
    }

    console.log(this.moodsKeys);

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.moodsKeys,
        datasets: [
          {
            label: "Počutje",
            fill: false,
            lineTension: 0.3,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: moodData,
            spanGaps: false,
          }
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
