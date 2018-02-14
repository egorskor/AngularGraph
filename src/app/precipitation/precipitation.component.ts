import {Component, OnInit, OnDestroy} from '@angular/core';
import {Chart} from 'chart.js';
import {GraphService} from "../graph.service";
import {DataService} from "../data.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-precipitation',
  templateUrl: './precipitation.component.html',
  styleUrls: ['./precipitation.component.css']
})
export class PrecipitationComponent implements OnInit, OnDestroy {

  chart = [];
  private subscription: Subscription;

  constructor(private dataService: DataService, private graphService: GraphService) {
  }

  chartJSHack() {
    window.document.getElementById('canvas').remove(); // this is my <canvas> element
    let node = document.createElement('canvas');
    node.id = "canvas";
    window.document.getElementById('graph-container').appendChild(node);
  }

  ngOnInit() {
    this.subscription = this.graphService.filterChangeStream.subscribe((val) => {
      this.reloadGraph(val);
    });
  }

  private async reloadGraph(val: { fromDate: Date; toDate: Date }) {

    this.chartJSHack();
    let precipitationValues = await this.dataService.getPrecipitation();
    let datesArray = await this.dataService.getDates();
    let ret1 = [];
    let ret2 = [];
    for (let i = 0; i < datesArray.length; i++) {
      if (new Date(datesArray[i]) >= val.fromDate
        && new Date(datesArray[i]) <= val.toDate) {
        ret1.push(datesArray[i]);
        ret2.push(precipitationValues[i]);
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
              labelString: 'Precipitation'
            }
          }],
        }
      }
    });

  }

  ngOnDestroy() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }
}

