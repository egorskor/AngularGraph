import { Injectable } from '@angular/core';

@Injectable()
export class FilterService {
  get toDate() {
    return this._toDate;
  }

  set toDate(value) {
    this._toDate = value;
  }
  get fromDate() {
    return this._fromDate;
  }

  set fromDate(value) {
    this._fromDate = value;
  }

  private _fromDate;
  private _toDate;

  constructor() { }


}
