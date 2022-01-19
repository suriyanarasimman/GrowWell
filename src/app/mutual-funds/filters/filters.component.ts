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

  value_returns: number = 10;

  options_returns: Options = {
    floor: 0,
    ceil: 50,
    step: 10
  };

  form: FormGroup;

  fund_data = {
    "code": "",
    "name": "",
    "type": "",
    "min_investment": "",
    "cagr": "",
    "nav": "",
    "last_update": ""
  }

  fund_data_array = []
  @Output() sendFundData = new EventEmitter<Array<Object>>();

  mf_data_obj = mf_data_module.mf_data;
  mf_data_filter;

  constructor(private gs: GeneralService) { }

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

  onSubmit() {
    this.fund_data_array = []
    // console.log(this.form.get("debt").value);
    this.mf_data_filter = []
    if (this.form.get("equity").value) {
      this.mf_data_filter.push(this.mf_data_obj.filter((fund) => fund.type == "equity" && fund.cagr > this.form.get("returnsSlider").value));
    }

    if (this.form.get("debt").value) {
      this.mf_data_filter.push(this.mf_data_obj.filter((fund) => fund.type == "debt" && fund.cagr > this.form.get("returnsSlider").value));
    }

    if (this.form.get("flexi").value) {
      this.mf_data_filter.push(this.mf_data_obj.filter((fund) => fund.type == "flexi" && fund.cagr > this.form.get("returnsSlider").value));
    }

    if (!(this.form.get("equity").value || this.form.get("debt").value || this.form.get("flexi").value)) {
      this.mf_data_filter.push(this.mf_data_obj.filter((fund) => fund.cagr > this.form.get("returnsSlider").value));
    }

    this.mf_data_filter.forEach((arr) => {
      arr.forEach((obj) => {
        this.gs.getFunds(obj.code).subscribe((response) => {
          this.fund_data = {
            "code": response.meta.scheme_code,
            "name": response.meta.scheme_name,
            "type": obj.type,
            "min_investment": obj.min_investment,
            "cagr": obj['cagr'],
            "nav": response.data[0].nav,
            "last_update": response.data[0].date
          }
          this.fund_data_array.push(this.fund_data);
        });
        this.mf_data_obj = mf_data_module.mf_data;
      })
    });
    this.sendFundData.emit(this.fund_data_array);
  }
}
