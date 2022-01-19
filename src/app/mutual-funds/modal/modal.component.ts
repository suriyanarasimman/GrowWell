import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  quantity:number;
  form: FormGroup;
  net_amt:number;
  userName:String;
  purchasingFundDetails:Object;

  @Input() fund_data: Object;
  fund_name;
  fund_min_investment:number;
  fund_cagr;
  fund_nav:number;
  fund_id:number;


  constructor(private gs:GeneralService, private cookieService:CookieService) { 
    // this.userName=localStorage.getItem("userName");
    this.userName=this.cookieService.get("userName");

    // this.userName="mr.bean";
  }

  ngOnInit(): void {
    this.quantity=1;
    this.net_amt=+this.fund_min_investment + (+(this.quantity*this.fund_nav));
    this.form = new FormGroup({
      qty: new FormControl(1,Validators.compose([Validators.required,Validators.min(1)]))
    });

  }

  ngOnChanges() {
    this.fund_id=this.fund_data["code"];
    this.fund_name = this.fund_data["name"];
    this.fund_min_investment=this.fund_data["min_investment"];
    this.fund_cagr=this.fund_data["cagr"];
    this.fund_nav=this.fund_data["nav"];
  }

  onClose(){
    this.quantity=0;
    this.net_amt=0;
  }

  onBuy(){
    this.purchasingFundDetails={
      userName:this.userName,
      fundId:this.fund_id,
      investmentAmount:this.net_amt
    }
    this.gs.registerMutualFund(this.purchasingFundDetails).subscribe((response)=>{
      console.log(response);
    })
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
