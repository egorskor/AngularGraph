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
    HttpClientModule
  ],
  providers: [TemperatureService, PrecipitationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
