import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';
import * as $ from 'jquery';

@Component({
  selector: 'section-one',
  templateUrl: './section-one.component.html',
  styleUrls: ['./section-one.component.css']
})
export class SectionOneComponent implements OnInit {

  constructor(private http: HttpService) { }
  ray:any;
 category:Array<any>;

  ngOnInit(): void {
    this.all_category();

    $(document).ready(function(){
     $('#price').click(function(){
        $('#show').text( $(this).val() );
     });
    });



  }

  async all_category(){
     await this.http.get_category();
    this.ray = await this.http.category;
    this.category=this.ray;
     

      //   (row)=>{
      //     this.ray= <any>row;
      //     for(var i =0; i<this.ray[0].length; i++){
            
      //         if(this.ray[0][i].table_name=='woman'){
      //           console.log(this.ray[0][i].name);

      //         }
      //     }

      //   }
      // ).catch( (err)=>{
      //   console.log(err);
      // } );
  }






}
