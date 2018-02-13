import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TemperatureComponent } from './temperature/temperature.component';
import { PrecipitationComponent } from './precipitation/precipitation.component';
import {TemperatureService} from "./temperature.service";
import {HttpClientModule} from "@angular/common/http";
import { PrecipitationService } from './precipitation.service';
import { FilterComponent } from './filter/filter.component';
import {DataService} from "./data.service";
import {FormsModule} from "@angular/forms";
import {FilterService} from "./filter.service";
import {GraphService} from "./graph.service";


@NgModule({
  declarations: [
    AppComponent,
    TemperatureComponent,
    PrecipitationComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [TemperatureService, PrecipitationService, DataService, FilterService, GraphService],
  bootstrap: [AppComponent]
})
export class AppModule { }
