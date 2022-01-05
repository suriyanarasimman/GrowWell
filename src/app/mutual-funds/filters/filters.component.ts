import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  value_min_invest: number = 1000;
  value_cagr: number = 10;
  options_min_invest: Options = {
    floor: 0,
    ceil: 10000,
    step:1000
  };
  options_cagr: Options = {
    floor: 0,
    ceil: 100,
    step:1
  };

  constructor() { }

  ngOnInit(): void {
  }

}
