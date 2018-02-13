import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class GraphService {

  leftBound: any;
  rightBound;

  private filterChangeBus = new BehaviorSubject({
    "fromDate": "1880-12-30",
    "toDate": "1882-01-01"
  });
  private leftBoundBus = new BehaviorSubject(null);
  private rightBoundBus = new BehaviorSubject(null);

  filterChangeStream = this.filterChangeBus.asObservable();
  leftBoundStream = this.leftBoundBus.asObservable();
  rightBoundStream = this.rightBoundBus.asObservable();


  changeFilter(value) {
    this.filterChangeBus.next(value);
  }

  changeRightBound(value) {
    this.rightBoundBus.next(value);
  }

}
