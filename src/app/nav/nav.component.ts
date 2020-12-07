import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user:any;
  constructor(private auth_service:AuthserviceService) { }

  ngOnInit(): void {
    if(this.auth_service._islogin())this.start();
  }

  async start(){
  this.user = await this.auth_service.user;
  console.log(this.user);
  }



}
