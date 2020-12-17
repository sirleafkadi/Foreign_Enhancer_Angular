import { Component, OnInit} from '@angular/core';
import { HttpService } from '../http.service';
import { ShareService } from '../share.service';


@Component({
  selector: 'section-one',
  templateUrl: './section-one.component.html',
  styleUrls: ['./section-one.component.css']
})
export class SectionOneComponent implements OnInit {

 cur_cat:String;

  constructor(private http: HttpService, private share:ShareService) { this.cur_cat='All departments'; }
  ray:any;
 category:Array<any>;
 
ngOnInit(): void {
    this.all_category();
  }
/////Loading all categories
  async all_category(){
     await this.http.get_category();
    this.ray = await this.http.category;
    this.category=this.ray;
}


cur_category(cat){
  this.cur_cat=cat;
}








}
