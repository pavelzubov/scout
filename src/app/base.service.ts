import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {DriverList, Driver} from './driver';
import {catchError} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) {
  }

  getList(): Observable<DriverList> {
    return this.http.get('/assets/data.json').pipe(
      map(res => <DriverList>res)
    );
  }

  getItem(id: number): Observable<Driver> {
    return this.http.get('/assets/data.json').pipe(
      map(res => <DriverList>res),
      map(res => {
        // Немного имитации серверной логики
        // Если в базе нет записи с таким id, то возвращаем ошибку
        let driver;
        if (driver = res.DriverList.find(item => item.id.value === id)) {
          return <Driver>driver;
        } else {
          throw new Error('Invalid id');
        }
      })
    );
  }

  updateItem(item: Driver): Observable<any> {
    return from(['true']).pipe(
      map(res => 'Удачно')
    );
  }

}
