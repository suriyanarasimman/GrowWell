import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  quantity:number=1;

  constructor() { }

  ngOnInit(): void {
  }


  @Input() fund_data: Object;
  fund_name;
  fund_min_investment;
  fund_cagr;
  fund_nav;

  ngOnChanges() {
    this.fund_name = this.fund_data["name"];
    this.fund_min_investment=this.fund_data["min_investment"];
    this.fund_cagr=this.fund_data["cagr"];
    this.fund_nav=this.fund_data["nav"];
  }

  onClose(){
    this.quantity=1;
  }

}
