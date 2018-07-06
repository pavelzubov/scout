import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, Observable, pipe} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {DriverList, Driver} from './driver';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  public list: DriverList;

  constructor(private http: HttpClient) {
    // При загрузке делаем объект из json
    this.getListFromJson().subscribe(res => {
      this.list = res;
    });
  }

  getListFromJson(): Observable<any> {
    // Берет данные из json
    return this.http.get('/assets/data.json');
  }

  getList(): Observable<DriverList> {
    // Если объект с данными существует, то возвращаем его
    // если нет, то создаем его
    return from(new Promise((resolve, reject) => {
      if (this.list) {
        resolve(this.list);
      } else {
        this.getListFromJson().subscribe(res => {
          this.list = res;
          resolve(this.list);
        }, err => {
          reject(err);
        });
      }
    })).pipe(
      map(res => <DriverList>res)
    );
  }

  getItem(id: number): Observable<Driver> {
    // Если объект с данными существует, то по нему ищем водителя
    // если нет, то сначала загружаем данные
    return from(new Promise((resolve, reject) => {
      if (this.list) {
        // Немного имитации серверной логики
        // Если в базе нет записи с таким id, то возвращаем ошибку
        let driver;
        if (driver = this.list.DriverList.find(item => item.id.value === id)) {
          resolve(<Driver>driver);
        } else {
          reject('Invalid id');
        }
      } else {
        const list$ = this.getList(),
          item$ = this.getItem(id);
        list$.pipe(
          switchMap(event => item$))
          .subscribe(val => console.log(val));
      }
    }));
  }

  updateField(driver: Driver, field: string, value: any): Observable<any> {
    // Метод обновления отдельных полей
    // проверяем можно ли обновлять поле
    return from(new Promise((resolve, reject) => {
      const changingDriverId = this.list.DriverList.findIndex(item => item.id.value === driver.id.value);
      if (this.list.DriverList[changingDriverId][field].canWrite) {
        this.list.DriverList[changingDriverId][field].value = value;
        resolve('Successful');
      } else {
        reject('This field can`t change');
      }
    }));
  }

  updateItem(driver: Driver): Observable<any> {
    // Как правило в работе изменяют записи отсылая сразу всю полностью, а не отдельное поле
    // потому как привычный вариант реализовал и этот метод
    return from(new Promise((resolve, reject) => {
      // Еще немного имитации серверной логики.
      // Проходим по полям. Если поле изменено
      // то проверяем, можно его изменять
      const changingDriverId = this.list.DriverList.findIndex(item => item.id.value === driver.id.value);
      for (const field in this.list[changingDriverId]) {
        if (!this.list.DriverList[changingDriverId].hasOwnProperty(field)) continue;
        if (this.list.DriverList[changingDriverId][field].value !== driver[field].value) {
          if (!this.list.DriverList[changingDriverId][field].canWrite) {
            reject('This field can`t change');
          }
        }
      }
      this.list.DriverList[changingDriverId] = driver;
      resolve('Successful');
    }));
  }

}
