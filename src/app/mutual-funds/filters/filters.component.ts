import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as mf_data_module from "src/app/mutual-funds/mf_data.json";
import { GeneralService } from 'src/app/services/general.service';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  // value_min_invest: number = 200;
  value_returns:number=10;

  // options_min_invest: Options = {
  //   floor: 0,
  //   ceil: 1000,
  //   step:100
  // };

  options_returns: Options = {
    floor: 0,
    ceil: 100,
    step:10
  };

  form:FormGroup;

  constructor(private gs:GeneralService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      equity: new FormControl(),
      debt: new FormControl(),
      flexi: new FormControl(),

      // tata_amc: new FormControl(),
      // icici_amc: new FormControl(),
      // ppfas_amc: new FormControl(),

      // minSlider: new FormControl(),
      returnsSlider: new FormControl()
    });
  }
  
  fund_data={
    "code":"",
    "name":"",
    "type":"",
    "min_investment":"",
    "cagr":"",
    "nav":"",
    "last_update":""
  }
  
  fund_data_array=[]
  @Output() sendFundData=new EventEmitter<Array<Object>>();

  onSubmit(){
    this.fund_data_array=[]

    mf_data_module.mf_data.forEach((obj)=>{
      
        this.gs.getFunds(obj.code).subscribe((response)=>{
          this.fund_data={
            "code":response.meta.scheme_code,
            "name":response.meta.scheme_name,
            "type":obj.type,
            "min_investment":obj.min_investment,
            "cagr":obj['3yr_returns'],
            "nav":response.data[0].nav,
            "last_update":response.data[0].date
          }
    
          // console.log(response);
          // console.log(this.fund_data);

          this.fund_data_array.push(this.fund_data);
        });
      
    });
    this.sendFundData.emit(this.fund_data_array);
    console.log(this.fund_data_array);
  }
}
