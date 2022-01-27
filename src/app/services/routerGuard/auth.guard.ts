import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  userValid: boolean=false;
  constructor(private router: Router,private cookieService:CookieService) {
    if(this.cookieService.check('userName')==true) {
        this.userValid=true;
      }
      else if(sessionStorage.hasOwnProperty("userName")==true) this.userValid=true;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userValid === true) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
