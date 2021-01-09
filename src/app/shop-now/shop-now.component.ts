import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-shop-now',
  templateUrl: './shop-now.component.html',
  styleUrls: ['./shop-now.component.css']
})
export class ShopNowComponent implements OnInit {


  cur_cat:String;
  total:any;
    constructor(private http: HttpService, private share:ShareService) { this.cur_cat='All departments'; }
    ray:any;
   category:Array<any>;
   
  ngOnInit(): void {
      this.all_category();
    }
  /////Loading all categories
    async all_category(){
       await this.http.get_category();
      this.ray = await this.http.category;
      this.category=this.ray;
  }
  
  
  cur_category(cat){
    this.cur_cat=cat;
  }
  
  
  get_total(event){
    this.total=event;
    console.log(this.total);
  }




}
