import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mutual-funds',
  templateUrl: './mutual-funds.component.html',
  styleUrls: ['./mutual-funds.component.scss']
})
export class MutualFundsComponent implements OnInit {

  funds:Array<Object>;
  modalOpened:Boolean=false;
  constructor() { }

  ngOnInit(): void {

  }

  recievedData:Boolean=false;
  arr=[];
  getFundData(data){
    this.funds=data;
    this.recievedData=true;
  }

  modalInject:any;
  onBuy(fund:any){
    // console.log(code);
    this.modalOpened=true;
    this.modalInject=fund;
  }

}
