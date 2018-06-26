import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseService} from '../../base.service';
import {Driver} from '../../driver';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  public id: number;
  public driver: Driver;

  constructor(public activateRoute: ActivatedRoute,
              public router: Router,
              public base: BaseService) {
    this.id = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.base.getItem(+this.id).subscribe(
      res => {
        console.log(res);
        this.driver = res;
      },
      error => {
        console.log(error);
        this.router.navigate(['']);
      });
  }

}
