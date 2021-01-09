import { Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnChanges {
  user:any;
  @Input() total:any;
  constructor(private auth_service:AuthserviceService, private cart_service:CartService) {  }
  
  ngOnChanges(changes: SimpleChanges)
  {
    // let change = changes['selectedModuleKey'];
 }

  ngOnInit(): void {
    if(this.auth_service._islogin())this.start();
    this.total=this.cart_service.get_cart();
    this.total=this.total.length;
  }
 
  async start(){
  this.user = await this.auth_service.user;
  }


}
