import {Component, OnDestroy, OnInit} from '@angular/core';
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

  chart = [];

  private subscription: Subscription;

  constructor(private dataService: DataService, private graphService: GraphService) {
  }

  ngOnInit() {
    this.subscription = this.graphService.filterChangeStream.subscribe((val) => {
      this.reloadGraph(val);
    });
  }

  //So sad but bug still is not resolved
  // https://stackoverflow.com/questions/24815851/how-to-clear-a-chart-from-a-canvas-so-that-hover-events-cannot-be-triggered
  chartJSHack(){
    window.document.getElementById('canvas').remove(); // this is my <canvas> element
    let node = document.createElement('canvas');
    node.id = "canvas";
    window.document.getElementById('graph-container').appendChild(node);
  }

  async reloadGraph(val) {
    this.chartJSHack();
    let datesArray = await this.dataService.getDates();
    let temperatureValues = await this.dataService.getTemperature();
    let ret1 = [];
    let ret2 = [];
    for (let i = 0; i < datesArray.length; i++) {

      if (new Date(datesArray[i]) >= val['fromDate']
        && new Date(datesArray[i]) <= val['toDate']) {
        ret1.push(datesArray[i]);
        ret2.push(temperatureValues[i]);
      }
    }

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ret1,
        datasets: [
          {
            data: ret2,
            borderColor: "#607D8B",
            fill: false
          }
        ]
      },
      options: {
        animation: false,
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
    if (this.subscription != null){
      this.subscription.unsubscribe();
    }
  }
}


