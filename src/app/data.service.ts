import {Injectable} from '@angular/core';
import {PrecipitationService} from "./precipitation.service";
import {TemperatureService} from "./temperature.service";
import {Temperature} from "./temperature";
import {Precipitation} from "./precipitation";
import {FilterService} from "./filter.service";
import "rxjs/add/operator/first";

@Injectable()
export class DataService {

  constructor(private precipitationService: PrecipitationService,
              private temperatureService: TemperatureService,
              private filterService: FilterService) {
  }

  //temperatureArray: Temperature[] = [];
  // precipitationArray: Precipitation[] = [];

  datesArray;
  temperatureValues;
  precipitationValues = [];

  async getDates() {
    if (this.datesArray == null) {
      await this.loadTemperature();
    }
    return this.datesArray;
  }

  getFilteredTemperature() {
    let ret1 = [];
    let ret2 = [];
    for (let i = 0; i < this.datesArray.length; i++) {
      if (new Date(this.datesArray[i]) >= new Date(this.filterService.fromDate)
        && new Date(this.datesArray[i]) <= new Date(this.filterService.toDate)) {
        ret1.push(this.datesArray[i]);
        ret2.push(this.temperatureValues[i]);
      }
    }
    return {
      dates: ret1,
      temperatures: ret2
    };
  }

  getTemperature() {
    return this.temperatureValues;
  }

  getPrecipitation() {
    return this.precipitationValues;
  }

  /*loadTemperature() {
   let ret =  this.temperatureService.getTemperature();
   ret.subscribe(res => {
     for (let i = 0; i < res['length']; i++) {
       if (new Date(res[i]['t']) > new Date("1880-12-30") && new Date(res[i]['t']) < new Date("1882-01-01")) {//TODO: remoce
         /!*this.temperatureArray.push({
           date: new Date(res[i]['t']),
           value: res[i]['v']
         });*!/
         this.datesArray.push(res[i]['t']);
         this.temperatureValues.push(res[i]['v'])
       }
     }
     console.log("temperature loaded");
   });

   return ret;
 }*/

  async loadTemperature() {
    let ret = await this.temperatureService.getTemperature().first().toPromise();
    this.datesArray = [];
    this.temperatureValues = [];
    for (let i = 0; i < ret['length']; i++) {
      if (new Date(ret[i]['t']) > new Date("1880-12-30") && new Date(ret[i]['t']) < new Date("1882-01-01")) {//TODO: remoce
        /*this.temperatureArray.push({
          date: new Date(res[i]['t']),
          value: res[i]['v']
        });*/
        this.datesArray.push(ret[i]['t']);
        this.temperatureValues.push(ret[i]['v'])
      }
    }
    console.log("temperature loaded");
    return ret;
  }

  loadPrecipitation() {
    this.precipitationService.getPrecipitation().subscribe(res => {
      for (let i = 0; i < res['length']; i++) {
        /*this.precipitationArray.push({
          date: new Date(res[i]['t']),
          value: res[i]['v']
        });*/
      }
    })
  }
}
