import { Component, OnInit, Input } from '@angular/core';
import {Chart} from 'chart.js';
import {PrecipitationService} from "../precipitation.service";

@Component({
  selector: 'app-precipitation',
  templateUrl: './precipitation.component.html',
  styleUrls: ['./precipitation.component.css']
})
export class PrecipitationComponent implements OnInit {

  @Input() title: string;

  chart = [];

  constructor(private precipitationService: PrecipitationService) {
  }

  ngOnInit() {
    this.precipitationService.getPrecipitation().subscribe(
      res => {
        let dateArray = [];
        let valueArray = [];
        // console.log(res);

        for (let i = 0; i < res['length']; i++) {
          //console.log(res[i]);
          if (new Date(res[i]['t']) > new Date("1880-12-30") && new Date(res[i]['t']) < new Date("1882-01-01")) {
            /*this.temperatureArray.push({
              date: res[i]['t'],
              value: res[i]['v']
            });*/
            dateArray.push(res[i]['t']);
            valueArray.push(res[i]['v'])
          }
          else {
            break;
          }
        }
        // console.log(dateArray);
        // console.log(valueArray);
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: dateArray,
            datasets: [
              {
                data: valueArray,
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
                  labelString: 'Precipitation'
                }
              }],
            }
          }
        });

      }
    )
  }


}
