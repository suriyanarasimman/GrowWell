import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mutual-funds',
  templateUrl: './mutual-funds.component.html',
  styleUrls: ['./mutual-funds.component.scss']
})
export class MutualFundsComponent implements OnInit {

  funds = [
    { scheme_name: "ICICI Prudential Large & Mid Cap Fund - Institutional Option - I - Growth", fund_house: "icici", scheme_type: "Open Ended Schemes", scheme_code: 100350,
    fund_category: "hybrid", cagr:12, min_investment:100 },
    { scheme_name: "icici tech", fund_house: "icici", scheme_type: "Open Ended Schemes", scheme_code: 100350,
    fund_category: "hybrid", cagr:12, min_investment:100 },
    { scheme_name: "icici tech", fund_house: "icici", scheme_type: "Open Ended Schemes", scheme_code: 100350,
    fund_category: "hybrid", cagr:12, min_investment:100 }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
