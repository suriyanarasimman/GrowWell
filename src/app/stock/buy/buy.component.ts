import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';
import { IStocks } from 'src/app/services/IStocks';
import { Nametosymbol } from 'src/assets/nametosymbol';
import { StockDetails } from 'src/assets/stockdetails';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  fullName: String;
  stockList: any;
  selectStocks = 
  [
    { "ticker": "ADN", "name": "ADN Industries", "price": 740 },
    { "ticker": "CIP", "name": "Cipla", "price": 955 },
    { "ticker": "HCT", "name": "HCLTECH", "price": 945 },
    { "ticker": "ICT", "name": "I&C Technologies", "price": 215 },
    { "ticker": "LCP", "name": "Lex Corp", "price": 450 },
    { "ticker": "MSF", "name": "Microsoft", "price": 278 },
    { "ticker": "NST", "name": "NESTLEIND", "price": 500 },
    { "ticker": "QPY", "name": "Q-Pay", "price": 768 },
    { "ticker": "SIS", "name": "Stark Industries", "price": 370 },
    { "ticker": "SVN", "name": "SVRN", "price": 430 },
    { "ticker": "TMS", "name": "TRQ Motors", "price": 320 },
    { "ticker": "TKS", "name": "TK Steel", "price": 990 },
    { "ticker": "WIS", "name": "Wayne Industries", "price": 800 }
];

  userName: string = "abc";
  displayPriceForLimitOrder: boolean = false;
  searchInput: String = '';
  price: number;
  Quantity:number;
  searchResult: Array<IStocks> = [];
  ordType:String = "Market Order";
  symbol:String;

  constructor(
    private formBuilder: FormBuilder,
    private generalService: GeneralService
  ) {}

  ngOnInit() {
   
  }

  datecalled(){
    console.log(this.searchInput)
    this.fullName = this.searchInput
    for (var i = 0; i < this.searchResult.length; i++){
      if (this.searchResult[i].name == this.searchInput){
        this.price = this.searchResult[i].price;
        this.symbol = this.searchResult[i].ticker;
        console.log(this.price)
        console.log(this.Quantity)
      }
    }
  }

  fetchSeries(){
      this.searchResult = this.selectStocks;
  }

  onOrderTypeChange(str:String) {
    if (str === "limit") {
      this.displayPriceForLimitOrder = true;
      this.ordType= str;
    } else {
      this.displayPriceForLimitOrder = false;
      this.ordType= str;
    }
  }
  onBuyFormSubmit() {

    let buyOrderRequest = {
      userName: this.userName,
      productName: this.fullName,
      productID: this.symbol,
      productType: 'STOCK',
      subcategory: 'STOCK',
      buyPrice: this.price,
      marketPrice: this.price,
      quantity: this.Quantity,
    };
    this.generalService.buyProduct(buyOrderRequest).subscribe(
      (res) => {
      }
    );
  }
 
}
