import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { ShareService } from '../share.service';


@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products:Array<any>;
  backup_product:any;
  show:String;
  load:boolean;
  price:any;
  config:any;
  cat:any;
  test:String;
  constructor(private http: HttpService, private share:ShareService, private route_activate:ActivatedRoute) { this.show='visible'; this.load=false; this.price=0; this.cat='All Departments';}
 

  ngOnInit(): void {
    this.get_products();
  }




  async  get_products(){
    await this.http.get_products();
    this.products=this.http.products;
    this.backup_product=this.products;

    this.config={
      itemsPerPage: 2,
      currentPage: 1,
     totalItems:this.products.length
    }
}


page_change(cur){
  this.config.currentPage=cur;
  console.log(cur);
  }


filter(filter:String){
  this.test=this.route_activate.snapshot.paramMap.get('cur_cat');

  console.log(this.test);

  this.cat =this.share.cur_cat;
  this.show='visibility:hidden';
  this.load=true;
if(filter=='reset') {
 this.share.cur_cat='All Departments';
 this.cat=this.share.cur_cat;
  this.price=0;
  this.products=this.backup_product;
}

 else {
   
  this.products=[];
  this.cat=this.share.cur_cat;
  if(this.price>0){
    this.backup_product.forEach(p => {
      if(p.price==this.price && p.sex==filter){

        if(this.cat!='All Departments'){
            if(p.category==this.cat){this.products.push(p);}
        }else{this.products.push(p);}
      }

    });
  }else{

    this.backup_product.forEach(p => {
      if(p.sex==filter){
        if(this.cat!='All Departments'){
          if(p.category==this.cat){this.products.push(p);}
      }else{this.products.push(p);}
      }

    });

  }
  
 

 }

 this.config.totalItems=this.products.length;
 setTimeout(() => {
   this.load=false;
   this.show='visible';
 }, 2000);



}
///////Filter by Pri
filter_price(input){
  console.log(input);
//   this.price=input;
//   if(input>0){
//  this.products=[]; this.backup_product.forEach( (p) => {
//     if(p.price==this.price){
//       this.products.push(p);
//     }
//   });

//   }

}





}
