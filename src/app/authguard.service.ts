import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(public auth_service:AuthserviceService, public  router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if(this.auth_service.isAuthenticated()){  localStorage.removeItem('token'); this.router.navigate(['/login']); return false; }
    return true;
   }



}
