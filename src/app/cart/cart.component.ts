import { ANY_STATE } from '@angular/animation/src/dsl/animation_transition_expr';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
count:any;
cart:Array<any>;
total:any;
total_price:number;
temp:any;
id:any;
explore_more:any;
one:any; two:any; three:any;
constructor(private cart_service:CartService, private http:HttpService) {this.total=0; this.count=1; this.one=0; this.two=0; this.three=0; }
 
ngOnInit(): void {
  this.total=this.cart_service.total;
  this.cart= this.cart_service.get_cart();
  if(this.cart) { this.total=this.cart.length; }
  this.get_price();
  this.get_explore_more();
}

 get_explore_more(){
if(this.cart[0]) this.one=this.cart[0].cat_id; if(this.cart[1]) this.two=this.cart[1].cat_id; if(this.cart[2]) this.three=this.cart[2].cat_id; 
  this.http.get_expore_more(this.one, this.two, this.three).subscribe( (row)=>{this.explore_more=row;  console.log(this.explore_more);}, (err)=>{console.log(err)} );
 }

 refresh_cart(){
   this.cart=this.cart_service.get_cart();
 }

  update(id, qt){
  this.cart_service.update(id, qt);
  this.get_price();
 }

get_id(id){
  this.id=id;
}

 remove(){
 
  if(this.id){
 this.temp=this.cart_service.get_cart();
  for(let i=0; i<this.temp.length; i++){
      if(this.temp[i]._id==this.id){ this.temp.splice(i, 1); break; }
  }
this.cart=this.temp;
this.total=this.cart_service.update_cart(this.cart);
this.id='';
this.get_price();
this.get_total();
 }
}

add(){}





get_price(){this.total_price= this.cart_service.price;}
get_total(){this.total=this.cart_service.total;}
}

