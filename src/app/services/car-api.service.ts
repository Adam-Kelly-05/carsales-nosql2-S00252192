import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs';
import { ICar } from '../interfaces/car';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CarApiService {
  constructor(private _http: HttpClient) {}
  private _siteURL = "http://localhost:5050/cars";

  getCarDetails():Observable<any> {

    return this._http.get<ICar>(this._siteURL)
    .pipe(
      tap(data => console.log('car data/error' + JSON.stringify(data))
    ),
    catchError(this.handleError)
    );
  }

  addCarDetails(car:ICar):Observable<any> {
   return this._http.post<ICar>(this._siteURL, car)
   .pipe(
    tap(data => console.log('add car message/error' + JSON.stringify(data))
    ),
    catchError(this.handleError)
    );
   }

  delCarDetails(carId:string):Observable<any> {
    let deleteURL=this._siteURL+":"+carId;
    return this._http.delete(deleteURL)
    .pipe(
      tap(data => console.log('del car message/error' + JSON.stringify(data))
    ),
    catchError(this.handleError)
    );
  }

  private handleError (err:HttpErrorResponse) {
    console.log('CarApiService: ' + err.message);
    return err.message;
  }


}


