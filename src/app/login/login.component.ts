import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
import { Customer } from '../customer_model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  msg:any;
  color:String;
  customer:Array<Customer>;
constructor(private auth_service:AuthserviceService, private router:Router) { this.msg=""; }
  formFer:FormGroup;
  ngOnInit(): void {
    this.formFer= new FormGroup({
      email: new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}")
      ]),
      password: new FormControl('',[
        Validators.required
      ])
    });
  
  }

async login(){
  await this.auth_service.login(this.formFer.value);

   if(this.auth_service.status){
     this.msg=this.auth_service.status.error;
    this.color='error';
   }else{
    this.msg='Successfuly logged in';
    this.color='success';
   }

    }
 
  










}
