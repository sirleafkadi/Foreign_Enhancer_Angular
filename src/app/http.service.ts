import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  category:any;
  products:any;

  constructor(private http_service:HttpClient) { }


 async get_category(){
   await this.http_service.get('http://localhost:9090/category/all').toPromise().then(
      (row)=> this.category = row
    ).catch( (err)=>{console.log(err)}  );
  }

  async get_products(){
   await this.http_service.get('http://localhost:9090/product/all').toPromise().then(
       (row)=> this.products = row
     ).catch( (err)=>{console.log(err)}  );
   }

}
