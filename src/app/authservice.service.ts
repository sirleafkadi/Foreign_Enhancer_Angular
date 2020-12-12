import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Customer } from './customer_model';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  customer : Array<Customer>;
  public user:any;
  public status:any;
  public islogin:boolean;
  constructor( public jwt: JwtHelperService, private http:HttpClient, private router:Router ) { this.status=null;}

  isAuthenticated(){
    const token = localStorage.getItem("token");
      return this.jwt.isTokenExpired(token);
  }
 
  async register (user){
  return  await this.http.post('http://localhost:9090/customer/register', user);
}
  async  login(input){
    return await this.http.post('http://localhost:9090/customer/login', input).toPromise().then((row) => {
      var token = row;
        localStorage.setItem('token', JSON.stringify(token));
        token = this.jwt.decodeToken(JSON.stringify(token));
        this.user= token;
        this.islogin=true;
      setTimeout(() => {
        this.router.navigate(['home']);
      }, 2000);

    }).catch((err) =>{ this.status=err.error; this.islogin=false; }  );
  }

  _islogin(){
    if(this.isAuthenticated()){  localStorage.removeItem('token'); this.islogin=false;  return false; }
   else{
    const real_token = localStorage.getItem("token");
    const token = this.jwt.decodeToken(JSON.stringify(real_token));
    this.user= token;
    
    return true;
   }
}










   unauthorized(){
   localStorage.removeItem('token');
return "Unauthorized user detected, please sign-in to continue your session!";
}

}
