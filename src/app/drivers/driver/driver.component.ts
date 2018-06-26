import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseService} from '../../base.service';
import {ArrayWrapper, Driver, NumberWrapper, StringWrapper} from '../../driver';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.sass']
})
export class DriverComponent implements OnInit {
  public id: number;
  public driver: Driver;
  public error = false;
  public controls = {
    name: false,
    phone: false,
    post: false,
    department: false,
    generalContractor: false,
    company: false,
    lineManager: false,
    driverLicenseNumber: false,
    driverLicenseDate: false,
    experience: false,
    driverAutoLicenseCategory: false,
    driverTractLicenseCategory: false
  };
  public driverForm: FormGroup;

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
        this.driverForm = new FormGroup({
          'name': new FormControl(this.driver.name.value, Validators.required),
          'phone': new FormControl(this.driver.phone.value),
          'post': new FormControl(this.driver.post.value),
          'department': new FormControl(this.driver.department.value),
          'generalContractor': new FormControl(this.driver.generalContractor.value),
          'company': new FormControl(this.driver.company.value),
          'lineManager': new FormControl(this.driver.lineManager.value),
          'driverLicenseNumber': new FormControl(this.driver.driverLicenseNumber.value),
          'driverLicenseDate': new FormControl(this.driver.driverLicenseDate.value),
          'experience': new FormControl(this.driver.experience.value),
          'driverAutoLicenseCategory': new FormControl(this.driver.driverAutoLicenseCategory.value),
          'driverTractLicenseCategory': new FormControl(this.driver.driverTractLicenseCategory.value)
        });
      },
      error => {
        console.log(error);
        this.error = true;
        setTimeout(() => this.router.navigate(['']), 5 * 1000);
      });
  }

  showControl(name: string) {
    this.controls[name] = true;
  }

  hideControl(name: string) {
    this.controls[name] = false;
  }

  edit(name: string) {
    // console.log(this.driver[name].value,this.driver[name].value)
    this.driver[name].value = this.driverForm.controls[name].value;
    this.hideControl(name);
  }

  cancel(name: string) {
    this.driverForm.controls[name].setValue(this.driver[name].value);
    this.hideControl(name);
  }

}
