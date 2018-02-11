import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";

@Injectable()
export class PrecipitationService {

  constructor(private _http: HttpClient) { }

  getPrecipitation() {
    return this._http.get("precipitation.json").map(result => result);
  }

}
