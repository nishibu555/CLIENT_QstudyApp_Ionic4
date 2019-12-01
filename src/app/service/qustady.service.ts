import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QustadyService {
  apiurl = "http://qstudy2.test/api"

  constructor(
    public http: HttpClient
  ) { }


  commonFunctionCall(param: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(this.apiurl, JSON.stringify(param), httpOptions
    )
  }

}
