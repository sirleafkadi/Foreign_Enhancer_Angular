import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  public cur_cat:String;
  constructor() {this.cur_cat='All Departments';}
  


    get_cat(){
      return this.cur_cat;
    }



}
