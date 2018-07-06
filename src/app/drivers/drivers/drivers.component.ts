import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseService} from '../../base.service';
import {Driver} from '../../driver';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.sass']
})
export class DriversComponent implements OnInit, OnDestroy {
  public drivers: Driver[];
  private sub;

  constructor(public base: BaseService) {
  }

  ngOnInit() {
    this.sub = this.base.getList().subscribe(res => {
      this.drivers = res.DriverList;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
