import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseService} from '../../base.service';
import {Driver, AutoCategory, TractorCategory} from '../../driver';
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
  public autoCategory = AutoCategory;
  public tractorCategory = TractorCategory;
  // Объект для конфигурирования инпутов
  // Содержит имя, переключатель отображения и текст подсказки
  public controls = {
    phone: {name: 'Номер телефона', show: false, popover: '10 цифр без кода страны'},
    post: {name: 'Должность', show: false, popover: ''},
    department: {name: 'Департамент', show: false, popover: ''},
    generalContractor: {name: 'Ген.подрядчик', show: false, popover: ''},
    company: {name: 'Компания', show: false, popover: ''},
    lineManager: {name: 'Линейный руководитель', show: false, popover: ''},
    driverLicenseNumber: {name: 'Номер в/у', show: false, popover: '10 цифр и заглавных русских букв'},
    driverLicenseDate: {name: 'Дата окончания срока действия в/у', show: false, popover: ''},
    experience: {name: 'Водительский стаж', show: false, popover: ''},
    driverAutoLicenseCategory: {name: 'Категория в/у', show: false, popover: ''},
    driverTractLicenseCategory: {name: 'Категория машиниста-тракториста', show: false, popover: ''}
  };
  public controlsArray: string[];
  public driverForm: FormGroup;
  public minDate = new Date();

  constructor(public activateRoute: ActivatedRoute,
              public router: Router,
              public base: BaseService) {
    this.id = this.activateRoute.snapshot.params['id'];
    // Для того чтобы пройтись по полям
    // и сделать форму перегоняем ключи controls в массив
    this.controlsArray = Object.keys(this.controls);
  }

  ngOnInit() {
    // Забираем данные по водителю
    // и после загрузки выставляем значения в реактивную форму
    this.base.getItem(+this.id).subscribe(
      res => {
        console.log(res);
        this.driver = res;
        this.driverForm = new FormGroup({
          'phone': new FormControl(this.driver.phone.value, [Validators.required,
            Validators.pattern('[0-9]{10}'),
            Validators.minLength(10),
            Validators.maxLength(10)]),
          'post': new FormControl(this.driver.post.value, [Validators.required]),
          'department': new FormControl(this.driver.department.value, [Validators.required]),
          'generalContractor': new FormControl(this.driver.generalContractor.value, [Validators.required]),
          'company': new FormControl(this.driver.company.value, [Validators.required]),
          'lineManager': new FormControl(this.driver.lineManager.value, [Validators.required]),
          'driverLicenseNumber': new FormControl(this.driver.driverLicenseNumber.value, [Validators.required,
            Validators.pattern('[А-Я0-9]{10}'),
            Validators.minLength(10),
            Validators.maxLength(10)]),
          'driverLicenseDate': new FormControl(this.driver.driverLicenseDate.value, [Validators.required]),
          'experience': new FormControl(this.driver.experience.value, [Validators.required]),
          'driverAutoLicenseCategory': new FormControl(this.driver.driverAutoLicenseCategory.value, [Validators.required]),
          'driverTractLicenseCategory': new FormControl(this.driver.driverTractLicenseCategory.value, [Validators.required])
        });
      },
      error => {
        // Тут показываем ошибку и через пять секунд переводим на список
        console.log(error);
        this.error = true;
        setTimeout(() => this.router.navigate(['']), 5 * 1000);
      });
  }

  showControl(name: string) {
    // Скрываем контролы
    for (const control in this.controls) {
      this.cancel(control);
    }
    // Костыль для даты
    // для неё создаем объект даты из iso-строки
    this.driverForm.controls[name].setValue(name === 'driverLicenseDate' ? new Date(this.driver[name].value) : this.driver[name].value);
    this.controls[name].show = true;
  }

  hideControl(name: string) {
    this.controls[name].show = false;
    this.driverForm.controls[name].reset();
  }

  edit(name: string) {
    // Еще один костыль для даты.
    // Перегоняем её в iso-строку перед сохранением в базу
    if (name === 'driverLicenseDate') {
      this.driver[name].value = new Date(this.driverForm.controls[name].value).toISOString();
    } else {
      this.driver[name].value = this.driverForm.controls[name].value;
    }
    this.base.updateField(this.driver, name, this.driver[name].value).subscribe(res => {
        console.log(res);
        this.driverForm.controls[name].reset();
        this.hideControl(name);
      }
    );
    /*
    // Вариант для работы с целой записью
    this.base.updateItem(this.driver).subscribe(res => {
        console.log(res);
        this.driverForm.controls[name].reset();
        this.hideControl(name);
      }
    );*/
  }

  cancel(name: string) {
    this.hideControl(name);
  }

  typeOf(field: string): string {
    // Эта фукнция нужна, чтобы при формировании формы
    // узнавать массивы и для них делать селекты
    return typeof field;
  }

  add(name: string) {
    this.showControl(name);
  }

  getCategory(field: string): Array<string> {
    // Эта функция позволяет из enum-перечисления сделать массив
    // Потом этот массив загоняется в селект
    const keys = Object.keys(field === 'driverAutoLicenseCategory' ? this.autoCategory : this.tractorCategory);
    return keys.slice(keys.length / 2);
  }
}
