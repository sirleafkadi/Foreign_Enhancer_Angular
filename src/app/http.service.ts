import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Product} from './products_bean'
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  category:any;
  constructor(private http_service:HttpClient) { }

  async get_category(){
   await this.http_service.get('http://localhost:9090/category/all').toPromise().then(
      (row)=> this.category = row
    ).catch( (err)=>{console.log(err)}  );
  }
  async get_products() { return await this.http_service.get('http://localhost:9090/product/all').toPromise();}
  async get_latest() { return await this.http_service.get('http://localhost:9090/product/latest').toPromise();}

   get_expore_more(...category):Observable<Product[]>{
  console.log('this testing ');
 return  this.http_service.get <Product[]> (`http://localhost:9090/product/explore_more/${category[0]}/${category[1]}/${category[2]}`);
 }

  filter_product(input:any):Observable<Product[]>{
 return  this.http_service.get <Product[]> (`http://localhost:9090/product/filter/${input}`);
 }



}
