import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ShareService } from '../share.service';


@Component({
  selector: 'section-one',
  templateUrl: './section-one.component.html',
  styleUrls: ['./section-one.component.css']
})
export class SectionOneComponent implements OnInit {

  constructor(private http: HttpService, private share:ShareService) { this.cat='All departments'; }
  ray:any;
 category:Array<any>;
 cat:any;


  ngOnInit(): void {
    
    this.all_category();
  }
/////Loading all categories
  async all_category(){
     await this.http.get_category();
    this.ray = await this.http.category;
    this.category=this.ray;
    
  }


categor(cat){
  this
  this.share.cur_cat=cat;
}








}
