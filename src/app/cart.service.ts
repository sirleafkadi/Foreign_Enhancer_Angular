import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
msg:String;
cart:any;
is_there:boolean;
quanity:any;
storage:any;
price:number;
updated_p=[];
sets:Set<any>;
total:number;
  constructor(private http_service:HttpService, private http:HttpService) { this.price=0;  this.init();  }
  
set_price():void{ 
  this.price=0;
  this.cart=this.get_cart();
  if(this.cart){
    this.cart.forEach(p=>{
    this.price+=p.price*p.qt;
  });
 }
}
  get_cart(){
   this.cart=JSON.parse(localStorage.getItem('cart'));
   return this.cart; 
}

  update(id, qt){
    if(qt){
    this.cart=this.get_cart();
        this.cart.forEach((p)=>{
           if(p._id==id){
              p.qt=qt;
           }
        });
        this.update_cart(this.cart);
        return this.cart;
      }
  }

update_cart(cart:any):void{ this.total=cart.length; localStorage.setItem('cart', JSON.stringify(cart) ); this.set_price(); }


async init(){
  this.storage= await this.http.get_products();
  this.cart=JSON.parse(localStorage.getItem('cart'));
  if(this.cart==null){ this.cart=[];  this.update_cart(this.cart);  } 
  else{
   this.cart.forEach(c => {
      this.storage.forEach(u => {
          if(c._id==u._id){u.qt=c.qt; this.updated_p.push(u); return; }
      });
  });
   this.storage='';
   this.cart=this.updated_p;
   this.update_cart(this.cart);
   this.set_price();
  }
 }
  add(item:any){
    this.is_there=false;
    this.cart=this.get_cart(); 
    if(this.cart.length==0){ this.cart.push(item);  this.update_cart(this.cart); return 'passed';  }
    else{
        this.cart.forEach((p)=>{
        if(p._id==item._id) this.is_there=true; return'fail';
      })
       if(this.is_there==false){ 
        this.cart.push(item);
        this.update_cart(this.cart);
          return 'passed';   
      }
    }
}




  clear(){

  }




}


