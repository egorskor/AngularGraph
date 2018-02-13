import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TemperatureService} from "../temperature.service";
import {Chart} from 'chart.js';
import {DataService} from "../data.service";
import {GraphService} from "../graph.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit, OnDestroy {

  @Input() title: string;

  chart = [];

  private subscription: Subscription;

  constructor(private dataService: DataService, private graphService: GraphService) {
  }

  ngOnInit() {

    // let data = this.dataService.getFilteredTemperature();

    this.subscription = this.graphService.filterChangeStream.subscribe((val) => {
      this.reloadGraph(val);
    });

  }

  async reloadGraph(val) {
    // this.chart.destroy();
    // this.chart.clear();
    this.chart = null;
    window.document.getElementById('canvas').remove(); // this is my <canvas> element
    let node = document.createElement('canvas');
    node.id = "canvas";
    window.document.getElementById('#graph-container').appendChild(node);
    let datesArray = await this.dataService.getDates();
    let temperatureValues = this.dataService.getTemperature();
    let ret1 = [];
    let ret2 = [];
    for (let i = 0; i < datesArray.length; i++) {
      if (new Date(datesArray[i]) >= new Date(val['fromDate'])
        && new Date(datesArray[i]) <= new Date(val['toDate'])) {
        ret1.push(datesArray[i]);
        ret2.push(temperatureValues[i]);
      }
    }


    console.log(ret1);
    console.log(ret2);
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ret1,
        datasets: [
          {
            data: ret2,
            borderColor: "#3cba9f",
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Temperature'
            }
          }],
        }
      }
    });
  }

  ngOnDestroy(){
    console.log("temperatureComponentDestroyed");
    if (this.subscription != null){
      this.subscription.unsubscribe();
    }
  }
}


