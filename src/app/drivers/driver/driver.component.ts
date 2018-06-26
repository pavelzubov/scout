import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  public id: number;

  constructor(private activateRoute: ActivatedRoute) {
    this.id = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
  }

}
