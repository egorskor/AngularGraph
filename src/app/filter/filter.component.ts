import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {Router} from '@angular/router';
import {FilterService} from "../filter.service";
import {GraphService} from "../graph.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  dates:Set<number> = new Set();
  fromDate: number;
  toDate: number;

  constructor(private dataService: DataService, private router: Router, private filterService: FilterService, private graphService: GraphService) {
  }

  onFromDateSelect() {
    this.filterService.fromDate = this.fromDate;
    this.graphService.changeFilter({
      "fromDate": new Date (this.fromDate, 0, 1),
      "toDate": new Date(this.toDate, 11, 31)
    });
  }

  onToDateSelect() {
    this.filterService.toDate = this.toDate;
    this.graphService.changeFilter({
      "fromDate": new Date (this.fromDate, 0, 1),
      "toDate": new Date(this.toDate, 11, 31)
    });
  }

  async ngOnInit() {
    //this.dataService.loadPrecipitation();//TODO? UNCOMMENT ME IF IT WAS EFFECTIVE
    let tmp = await this.dataService.getDates();
    this.dates = new Set (tmp.map(function(date) {
      return new Date(date).getFullYear();
    }));
    this.fromDate = this.dates.values().next().value;
    this.toDate = Array.from(this.dates).pop();
  }

}
