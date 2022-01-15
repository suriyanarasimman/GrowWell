import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  quantity:number=1;
  form: FormGroup;
  net_amt:number;

  @Input() fund_data: Object;
  fund_name;
  fund_min_investment:number;
  fund_cagr;
  fund_nav:number=0;


  constructor() { }

  ngOnInit(): void {
    this.net_amt=+this.fund_min_investment + (+(this.quantity*this.fund_nav));
    this.form = new FormGroup({
      qty: new FormControl(1,Validators.compose([Validators.required,Validators.min(1)]))
    });

  }

  ngOnChanges() {
    this.fund_name = this.fund_data["name"];
    this.fund_min_investment=this.fund_data["min_investment"];
    this.fund_cagr=this.fund_data["cagr"];
    this.fund_nav=this.fund_data["nav"];
  }

  onClose(){
    this.quantity=1;
  }

  onBuy(){

  }

  decrement(){
    this.quantity=this.quantity-1;
    this.net_amt=+this.fund_min_investment + (+(this.quantity*this.fund_nav));
  }

  increment(){
    this.quantity=this.quantity+1;
    this.net_amt=+this.fund_min_investment + (+(this.quantity*this.fund_nav));
  }

  validateQty(){
    if(this.quantity<1){
      return true;
    }
  }
}
