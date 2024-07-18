import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated(): boolean {
    try {
        const userType = localStorage.getItem('pmtuserType');
        return userType ? true : false;

        const userId = localStorage.getItem('pmtuserId');
        return userId ? true : false;
    }
    catch (error) {
        return false;
    }
  }
}
