import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DriverList} from './driver';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) {
  }

  getData(): Observable<DriverList> {
    return this.http.get('/assets/data.json').pipe(
      map(res => <DriverList>res)
    );
  }
}
