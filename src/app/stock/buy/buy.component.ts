import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { GeneralService } from 'src/app/services/general.service';
import { IStocks } from 'src/app/services/IStocks';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  fullName: String;
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

  userName;
  displayPriceForLimitOrder: boolean = false;
  searchInput: String = '';
  price: number;
  pricesent:number;
  Quantity:number = 1;
  Limit:number;
  searchResult: Array<IStocks> = [];
  ordType:String = "Market Order";
  symbol:String;

  constructor(private generalService: GeneralService, private cookieService: CookieService) {
    this.userName=this.cookieService.get("userName");
  }

  ngOnInit() {
   
  }

  datecalled(){
    console.log(this.searchInput)
    this.fullName = this.searchInput
    for (var i = 0; i < this.searchResult.length; i++){
      if (this.searchResult[i].name == this.searchInput){
        this.price = this.searchResult[i].price;
        this.Limit = this.searchResult[i].price;
        this.pricesent = this.price;
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
    if(this.displayPriceForLimitOrder){this.pricesent = this.Limit;}
    console.log("Inside onBuyFormSubmut price to be sent: " + this.pricesent)
    console.log("Username: " + this.userName)
    let buyOrderRequest = {
      userName: this.userName,
      productName: this.fullName,
      productID: this.symbol,
      productType: 'STOCK',
      subcategory: 'STOCK',
      buyPrice: this.pricesent,
      marketPrice: this.price,
      quantity: this.Quantity,
    };
    this.generalService.buyProduct(buyOrderRequest).subscribe(
      (res) => {
      }
    );
  }
  addQuantity(){
    this.Quantity = this.Quantity + 1;
  }
  subQuantity(){
    if(this.Quantity > 1)
    this.Quantity = this.Quantity - 1;
  }
  addLimit(){
    this.Limit = this.Limit + 1;
  }
  subLimit(){
    if(this.Limit > 1)
    this.Limit = this.Limit - 1;
  }
 
}
