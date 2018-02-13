import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {ActivatedRoute} from "@angular/router";
import {Router} from '@angular/router';
import {FilterService} from "../filter.service";
import {GraphService} from "../graph.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() graphName: string;
  dates: Date[] = [];
  // toDate: Date[] = [];
  fromDate: Date;
  toDate: Date;

  constructor(private dataService: DataService, private router: Router, private filterService: FilterService, private graphService: GraphService) {
  }

  onFromDateSelect() {
    this.filterService.fromDate = this.fromDate;
    /*let url = "/" + this.graphName + "!" + "fromDate" + this.fromDate + ";" + "toDate" + this.toDate;
    console.log(url);
    this.router.navigateByUrl(url);
    console.log(this.toDate);*/
    this.graphService.changeFilter({
      "fromDate": this.fromDate,
      "toDate": this.toDate
    });
  }

  onToDateSelect() {
    this.filterService.toDate = this.toDate;
    this.graphService.changeFilter({
      "fromDate": this.fromDate,
      "toDate": this.toDate
    });
  }

  async ngOnInit() {
    /*await this.dataService.loadTemperature();*//*.subscribe(
      res => {
        for (let i = 0; i < res['length']; i++) {
          if (new Date(res[i]['t']) > new Date("1880-12-30") && new Date(res[i]['t']) < new Date("1882-01-01")) {//TODO: remoce
            this.dates.push(res[i]['t']);
            // this.toDate.push(res[i]['t']);
          }
        }
        this.fromDate = this.dates[0];
        this.toDate = this.dates[this.dates.length - 1];
      }
    );*/
    this.dataService.loadPrecipitation();
    console.log("start fills searchs with" + this.dataService.getDates());
    this.dates = await this.dataService.getDates();
  }

  fulfillDropDowns(res){
    for (let i = 0; i < res['length']; i++) {
      console.log(res[i]['t']);
      if (new Date(res[i]['t']) > new Date("1880-12-30") && new Date(res[i]['t']) < new Date("1882-01-01")) {//TODO: remoce
        this.dates.push(res[i]['t']);
        // this.toDate.push(res[i]['t']);
      }
    }
    this.fromDate = this.dates[0];
    this.toDate = this.dates[this.dates.length - 1];
    console.log("searchs filled with " + this.dates.length);
  }


  updateFromDate(date: Date) {
    this.fromDate = date;
    console.log(date);
    window['fromDateFilter'] = date;
  }

  updateToDate(date: Date) {
    this.toDate = date;
    console.log(date);
    window['toDateFilter'] = date;
  }
}
