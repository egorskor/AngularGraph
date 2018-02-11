import {Component, Input, OnInit} from '@angular/core';
import {TemperatureService} from "../temperature.service";
import {Chart} from 'chart.js';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {

  @Input() title: string;

  chart = [];

  constructor(private temperatureService: TemperatureService) { }

  ngOnInit() {
    this.temperatureService.getTemperature().subscribe(
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
                display: true,
              }],
              yAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'temperature'
                }
              }],
            }
          }
        });

      }
    )
  }

}
