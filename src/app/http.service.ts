import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  category:any;
  constructor(private http_service:HttpClient) { }


 async get_category(){
   
   await this.http_service.get('http://localhost:9090/category/all').toPromise().then(
      (row)=> this.category = row[0]
    ).catch( (err)=>{console.log(err)}  );
  }



}
