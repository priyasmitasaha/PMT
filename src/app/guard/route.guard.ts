import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RouteService } from '../services/route.service';

@Injectable({
  providedIn: 'root',
})



export class RouteGuard implements CanActivate {

  constructor(private routeService: RouteService, private router: Router) { }

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const isAuthenticated = this.routeService.isAuthenticationChecked();
      if (isAuthenticated) {
          return true;
        
      } else {
       
          return this.router.navigate(['']).then(() => {
              return Promise.reject(false);
          }).catch(err => {
              return false;
          });
      }
  }
}
