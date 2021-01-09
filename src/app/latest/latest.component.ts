import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpService } from '../http.service';
import * as $ from 'jquery';
@Component({
  selector: 'latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.css']
})
export class LatestComponent implements OnInit {
  product:any;
  msg:String;
  color:String;
  cur:string;
  constructor(private http:HttpService,  private cart_service:CartService,) { }

  ngOnInit(): void {
    this.get_latest();

    $(document).ready(function(){
      $('.add').mouseenter(function(){
       
      })
    });


  }
///////Getting Latest products
  async get_latest(){
   await  this.http.get_latest().then( (row)=> this.product=row ).catch( (err)=>console.log(err)  )
  }
///////Adding to cart
  add(item){
    // this.update_total(this.cart_service.total);
    this.cur=item.title;
    this.msg= this.cart_service.add(item);
    if(this.msg=='passed'){this.msg='added to cart!'; this.color='passed'; }
    else{this.msg='already in cart!'; this.color='fail';}

    setTimeout(() => {
      this.msg='';
    }, 1200);
 }


}
