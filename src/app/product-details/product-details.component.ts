import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import * as $ from 'jquery';
import { ShareService } from '../share.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  products:Array<any>;
  id:any;
  cur_img:any;
  name = 'Angular';
  myThumbnail='http://placekitten.com/200/126';
  myFullresImage='http://placekitten.com/200/126';
  constructor(private http: HttpService, private router_activate:ActivatedRoute, private share:ShareService) {
  }

 async ngOnInit(): Promise<void> {
  await  this.get_products();
    console.log(this.products);
    this.id= this.router_activate.snapshot.paramMap.get('id');
    this.products.forEach((p)=>{
        if(p._id==this.id){ this.cur_img=p.img_medium;}
    });
}

 

cur(url){
this.cur_img=url;
}




async  get_products(){
  await this.http.get_products();
 this.products=  await this.http.products;
}


}
