import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  cur_cat:String;
  ray:any;
  category:Array<any>;
  constructor(private http: HttpService,) { }

  ngOnInit(): void {
    this.all_category();

  }


  async all_category(){
    await this.http.get_category();
   this.ray = await this.http.category;
   this.category=this.ray;
}


  cur_category(cat){
    this.cur_cat=cat;
  }



}
