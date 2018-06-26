import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DriverList, Driver} from './driver';

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
      map(res => <Driver>res.DriverList.find(item => item.id.value === id))
    );
  }
}
