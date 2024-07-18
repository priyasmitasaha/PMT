import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}


@Injectable({
  providedIn: 'root'
})
export class TargetService {
  alertShowTime = 4000;
  errContent = "Error"
  succContent = "Ok"
  limit: number = 10;
  offset: number = 0;
  API_ROOT = environment.API_ROOT;

  constructor(private http: HttpClient) { }

  getAllTargetCount(data: any){
    return this.http.post(this.API_ROOT + 'common/targetCountList', data , httpOptions);
  }

  getmonthlyTargetCount(data: any){
    return this.http.post(this.API_ROOT + 'common/getmonthlyTargetCount', data , httpOptions);
  }
}
