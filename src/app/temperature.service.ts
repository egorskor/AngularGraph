import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/add/operator/map";


@Injectable()
export class TemperatureService {

  constructor(private _http: HttpClient) { }

  getTemperature() {
    return this._http.get("temperature.json")
      .map(result => result);
  }

}
