import {Injectable} from '@angular/core';
import {PrecipitationService} from "./precipitation.service";
import {TemperatureService} from "./temperature.service";
import {FilterService} from "./filter.service";
import "rxjs/add/operator/first";

@Injectable()
export class DataService {

  constructor(private precipitationService: PrecipitationService,
              private temperatureService: TemperatureService,
              private filterService: FilterService) {
  }

  temperaturePromise;
  precipitationPromise;

  datesArray;
  temperatureValues;
  precipitationValues = [];

  getDates() {
    if (this.temperaturePromise == null) {
      this.loadTemperature();
    }
    let tmp = this.temperaturePromise.then(res => {
        return this.datesArray;
      }
    );

    return tmp;
  }

  getTemperature() {
    if (this.temperaturePromise == null) {
      this.loadTemperature();
    }
    let tmp = this.temperaturePromise.then(res => {
        return this.temperatureValues;
      }
    );

    return tmp;
  }

  async getPrecipitation() {
    if (this.precipitationPromise == null) {
      this.loadPrecipitation();
    }
    let tmp = this.precipitationPromise.then(res => {
        return this.precipitationValues;
      }
    );
    return tmp;
  }

  /*
    async loadTemperature() {
      this.temperaturePromise = await this.temperatureService.getTemperature().first().toPromise();
      this.fillTemperatureCache(this.temperaturePromise);
    }*/

  loadTemperature() {
    this.temperaturePromise = this.temperatureService.getTemperature().first().toPromise().then(res => {
        this.fillTemperatureCache(res);
      }
    );
  }

  fillTemperatureCache(ret) {
    this.datesArray = [];
    this.temperatureValues = [];
    for (let i = 0; i < ret['length']; i++) {
      // if (new Date(ret[i]['t']) > new Date("1880-12-30") && new Date(ret[i]['t']) < new Date("1884-01-01")) {//TODO: remoce

      this.datesArray.push(ret[i]['t']);
      this.temperatureValues.push(ret[i]['v'])
      // }
    }
  }

  loadPrecipitation() {
    this.precipitationPromise = this.precipitationService.getPrecipitation().first().toPromise().then(res => {
        this.fillPrecipitationCache(res);
      }
    );
  }

  fillPrecipitationCache(ret) {
    this.datesArray = [];
    this.precipitationValues = [];
    for (let i = 0; i < ret['length']; i++) {
      // if (new Date(ret[i]['t']) > new Date("1880-12-30") && new Date(ret[i]['t']) < new Date("1884-01-01")) {//TODO: remoce

      this.datesArray.push(ret[i]['t']);
      this.precipitationValues.push(ret[i]['v'])
      // }
    }
  }
}
