import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { HttpService } from '../http.service';
import { ShareService } from '../share.service';
import * as $ from 'jquery';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnChanges {
  @Input() pro_cur_cat:String;
  @Output() total_items = new EventEmitter<number>();
  products:any;
  backup_product:any;
  show:String;
  load:boolean;
  price:any;
  config:any;
  msg:String;
  color:String;
  cur_cat:String;
  cur_category:number;
  cur_gender:number;
  cur_min:number;
  cur_max:number;
  cur_sort:String;
  total:any;
  ray:any;
  category:Array<any>;


  constructor( private cart_service:CartService, private http: HttpService, private share:ShareService, private route_activate:ActivatedRoute) { 
    
    this.cur_min=0; this.cur_max=0; this.cur_sort='asc';
    this.cur_gender=0; this.cur_category=0; this.cur_cat='All departments'; this.show='visible'; this.load=false; this.price=0;
  
  
  
  }
 
 ngOnInit(): void {this.get_products();  this.all_category();

    $(document).ready(function(){
      $('#reset').click(()=>{
          $('#category').val('');  $('.gender').checked=false;  $('.price').val('');  $('.sort').removeAttr('checked');
      })

      $('#update').click(()=>{
        $('#pro').slideDown();
    })
  }
      );

}
  /////Loading all categories
  async all_category(){
    await this.http.get_category();
   this.ray = await this.http.category;
   this.category=this.ray;
}

async filter_update(){
 let temp_sql=[];
let sql='select * from developer.load_product where ';

  if(this.cur_category>0){temp_sql.push('load_product.cat_id='+this.cur_category); }
  if(this.cur_gender>0){temp_sql.push('load_product.gender='+this.cur_gender);}
  if(this.cur_min>0 && this.cur_max>0){temp_sql.push(`load_product.price between ${this.cur_min} and ${this.cur_max}`);}
  else if(this.cur_min>0){temp_sql.push(`load_product.price > ${this.cur_min}`);}
  else if(this.cur_max>0){temp_sql.push(`load_product.price < ${this.cur_max}`);}
let size=temp_sql.length-1;
for(let i=0; i<temp_sql.length; i++){
    sql+=temp_sql[i];
  if(i<size){sql+=' and '};
}
sql+=` order by load_product.title  ${this.cur_sort}`;
await this.http.filter_product(sql).subscribe( (row)=>{this.products=[];this.products=row; console.log(this.products)}, (err)=>console.log(err) );
}

get_total(event){
  this.total=event;
}
  async get_products(){
     await this.http.get_products().then(  (row)=> { this.products=row} ).catch((err)=>console.log(err) );
    this.backup_product=this.products;
    this.config={
      itemsPerPage: 2,
      currentPage: 1,
      totalItems:this.products.length
    }
}

page_change(cur){this.config.currentPage=cur;}

//////Detecting changing from parent component

async  ngOnChanges(changes: SimpleChanges): Promise<void>
{
  if(this.pro_cur_cat!='All departments'){
  this.price=0;
  this.products=[];
  
  this.backup_product.forEach(p => {
    if(p.category==this.pro_cur_cat){
      this.products.push(p);
    }

  });
  this.config.totalItems=this.products.length;
  }





}

add(item){
  
   this.msg= this.cart_service.add(item);
   if(this.msg=='passed'){this.msg='added to cart!'; this.color='passed'; this.update_total(this.cart_service.total);}
   else{this.msg='already in cart!'; this.color='fail';}
}

  update_total(total) {
    this.total_items.emit(total);
  }


  filter(filter:String){
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

 

set_cat(value){
  this.cur_category=value; 
}

set_gender(value){
  this.cur_gender=value; 
}

set_min_price(value){
  this.cur_min=value;
}

set_max_price(value){
  this.cur_max=value;

}

set_sort(value){
this.cur_sort=value;
}

current_category(cat){
  this.cur_cat=cat;
}







}
