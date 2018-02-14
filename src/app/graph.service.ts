import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class GraphService {

  private filterChangeBus = new BehaviorSubject({
    "fromDate": new Date("1880-12-30") ,
    "toDate": new Date("2007-01-01")
  });

  filterChangeStream = this.filterChangeBus.asObservable();

  changeFilter(value) {
    this.filterChangeBus.next(value);
  }

}
