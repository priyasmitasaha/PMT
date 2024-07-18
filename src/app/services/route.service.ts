import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  isAuthenticationChecked(): any {
    try {
        const userType = localStorage.getItem('pmtuserType');
        if(userType == 'SSME' || userType == 'SME' || userType == 'JSME' || userType == 'ATL' ){
          return userType ? true : false;
        }
    }
    catch (error) {
        return false;
    }
  }
}
