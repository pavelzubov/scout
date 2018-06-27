import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap';
import {DriversRoutingModule} from './drivers-routing.module';
import {DriversComponent} from './drivers/drivers.component';
import {DriverComponent} from './driver/driver.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DriversRoutingModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  declarations: [DriversComponent, DriverComponent]
})
export class DriversModule {
}
