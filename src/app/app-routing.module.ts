import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TemperatureComponent} from "./temperature/temperature.component";
import {PrecipitationComponent} from "./precipitation/precipitation.component";

const routes: Routes = [
  { path: '',redirectTo: 'temperature!', pathMatch: 'full' },
  { path: 'temperature!', component: TemperatureComponent },
  { path: 'precipitation!', component: PrecipitationComponent }/*,
  { path: 'temperature!fromDate{fromDate};toDate{toDate}=', component: TemperatureComponent },
  { path: 'precipitation!fromDate{fromDate}', component: PrecipitationComponent }*/
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
