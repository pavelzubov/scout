import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DriverList, Driver} from './driver';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  public list: DriverList;

  constructor(private http: HttpClient) {
    this.getListFromJson().subscribe(res => {
      this.list = res;
    });
  }

  getListFromJson(): Observable<any> {
    return this.http.get('/assets/data.json');
  }

  getList(): Observable<DriverList> {
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
        this.getList().subscribe(res => {
          this.getItem(id).subscribe(resl => {
            resolve(<Driver>resl);
          });
        });
      }
    }));
  }

  updateItem(driver: Driver): Observable<any> {
    return from(new Promise((resolve, reject) => {
      // Еще немного имитации серверной логики
      // Проходим по полям. Если поле изменено
      // то проверяем, можно его изменять
      const changingDriverId = this.list.DriverList.findIndex(item => item.id.value === driver.id.value);
      for (const field in this.list[changingDriverId]) {
        if (!this.list[changingDriverId].hasOwnProperty(field)) continue;
        if (this.list[changingDriverId][field].value !== driver[field].value) {
          if (!this.list[changingDriverId][field].canWrite) {
            reject('This field can`t change');
          }
        }
      }
      this.list[changingDriverId] = driver;
      resolve('Successful');
    }));
  }

}
