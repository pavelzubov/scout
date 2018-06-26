import {Component, OnInit} from '@angular/core';
import {BaseService} from '../../base.service';
import {Driver} from '../../driver';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {
  public drivers: Driver[];

  constructor(public base: BaseService) {
  }

  ngOnInit() {
    this.base.getList().subscribe(res => {
      this.drivers = res.DriverList;
    });
  }

}
