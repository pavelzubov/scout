import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DriversRoutingModule} from './drivers-routing.module';
import {DriversComponent} from './drivers/drivers.component';
import {DriverComponent} from './driver/driver.component';

@NgModule({
  imports: [
    CommonModule,
    DriversRoutingModule,
  ],
  providers: [],
  declarations: [DriversComponent, DriverComponent]
})
export class DriversModule {
}
