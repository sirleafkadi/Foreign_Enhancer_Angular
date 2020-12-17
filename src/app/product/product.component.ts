import { Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { ShareService } from '../share.service';


@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnChanges {
  @Input() pro_cur_cat:String;
  products:Array<any>;
  backup_product:any;
  show:String;
  load:boolean;
  price:any;
  config:any;
  
  constructor(private http: HttpService, private share:ShareService, private route_activate:ActivatedRoute) { this.show='visible'; this.load=false; this.price=0;}
 
  ngOnInit(): void {
    this.get_products();
  }

  async  get_products(){
    await this.http.get_products();
    this.products=this.http.products;
    this.backup_product=this.products;
    this.share.products=this.backup_product;
    this.config={
      itemsPerPage: 2,
      currentPage: 1,
     totalItems:this.products.length
    }
}

page_change(cur){
  this.config.currentPage=cur;
  }

//////Detecting changing from parent component

ngOnChanges(changes: SimpleChanges): void
{
  this.price=0;
  this.products=[];
  this.backup_product.forEach(p => {
    if(p.category==this.pro_cur_cat){
      this.products.push(p);
    }

  });
    this.config.totalItems=this.products.length;
}



  filter(filter:String){
console.log(this.pro_cur_cat);
this.show='visibility:hidden';
this.load=true;
if(filter=='reset') {
 this.pro_cur_cat ='All departments';
 this.price=0;
this.products=this.backup_product;
}

 else {
   
  this.products=[];
  if(this.price>0){
    this.backup_product.forEach(p => {
      if(p.price==this.price && p.sex==filter){

        if(this.pro_cur_cat!='All departments'){
            if(p.category==this.pro_cur_cat){this.products.push(p);}
        }else{this.products.push(p);}
      }

    });
  }else{

    this.backup_product.forEach(p => {
      if(p.sex==filter){
        if(this.pro_cur_cat!='All departments'){
          if(p.category==this.pro_cur_cat){this.products.push(p);}
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






}
