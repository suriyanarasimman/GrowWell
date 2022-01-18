import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';
import { StockDetails } from 'src/assets/stockhistory/stockdetails';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {

  public stockdetails;
  stockList = 
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

  displayBuy: boolean=true;
  qty=1;
  cost;
  flag=0;
  sendPrice;
  first=0;
  searchResult;
  limitprice=1;
  QuantityLimit;
  sellProductAvailable=false;
  marketType: String= "Market";
  price:number =10;
  userName: string = localStorage.getItem('userName');;


  constructor(private productService: GeneralService) {}

  ngOnInit() {
    this.setStockDetails("ADN");
    this.fetchSeries()
  }
  datecalled(){
    console.log(this.stockdetails.name)
    
    for (var i = 0; i < this.searchResult.length; i++){
      if (this.searchResult[i].productID == this.stockdetails.name){
        this.sellProductAvailable=true;
        this.QuantityLimit = this.searchResult[i].quantity;
      }
    }
  }
  checkSell(){
    this.datecalled()
    if(!this.displayBuy){
      if(!this.sellProductAvailable){
        console.log("Not available")
      }
    }
  }

  fetchSeries(){
    if(this.first === 0){
    this.productService.productsOwnedByUser(this.userName).subscribe(
      (res) => {
        this.searchResult = res.filter(
          (product) => product.productType === "STOCK"
        );
      },
      (err) => {
        console.log(err);
      }
    );
    this.first =1
    }
  }

  setStockDetails(name: String) {
    this.stockdetails  ={
      "name": name,
      "price":this.price,
      "open": Math.floor(Math.random() * 10),
      "high": Math.floor(Math.random() * 10),
      "low": Math.floor(Math.random() * 10),
      "close": Math.floor(Math.random() * 10),
      "volume": Math.floor(Math.random() * 10),
      "ex_dividend": Math.floor(Math.random() * 10),
      "split_ratio":Math.floor(Math.random() * 10),
      "adj_open": Math.floor(Math.random() * 10),
      "adj_high": Math.floor(Math.random() * 10),
      "adj_low": Math.floor(Math.random() * 10),
      "adj_close": Math.floor(Math.random() * 10),
      "adj_volume":Math.floor(Math.random() * 10)
    };
  }

  currentStock(name: String){
    this.setStockDetails(name)
  }
  buySell(name: String, price:number){
      this.price = price;
      this.setStockDetails(name)
  }
  displayon(){
    console.log("sample: " + this.qty)
  }

  addQuantity(){
    this.qty = this.qty + 1;
  }
  subQuantity(){
    if(this.qty > 1)
    this.qty = this.qty - 1;
  }

  addPrice(){
    if(this.marketType !="Market"){
    if(this.flag==0)
    {this.limitprice = this.stockdetails.price + 1;
      this.flag=1
      return
    }
    this.limitprice = this.limitprice + 1;
  }
  }
  subPrice()
  {
    if(this.marketType !="Market"){
    if(this.flag==0)
    {this.limitprice = this.stockdetails.price -1;
      this.flag=1;
      return
    }
    if(this.limitprice > 1)
    this.limitprice = this.limitprice - 1;
  }
 }
 onBuyFormSubmit() {
  if(this.marketType == "Limit"){this.sendPrice = this.limitprice;}
  if(this.marketType == "Market"){this.sendPrice =this.stockdetails.price;}
  let buyOrderRequest = {
    userName: this.userName,
    productName: this.stockdetails.name,
    productID: this.stockdetails.name,
    productType: 'STOCK',
    subcategory: 'STOCK',
    buyPrice: this.sendPrice,
    marketPrice: this.stockdetails.price,
    quantity: this.qty,
  };
  this.productService.buyProduct(buyOrderRequest).subscribe(
    (res) => {
    }
  );
 }

 onSellFormSubmit() {
  if(this.marketType == "Limit"){this.sendPrice = this.limitprice;}
  if(this.marketType == "Market"){this.sendPrice =this.stockdetails.price;}
  let sellOrderRequest = {
    userName: this.userName,
    productName: this.stockdetails.name,
    productID: this.stockdetails.name,
    productType: 'STOCK',
    subcategory: 'STOCK',
    buyPrice: this.sendPrice,
    marketPrice: this.stockdetails.price,
    quantity: this.qty,
  };
  this.productService.sellProduct(sellOrderRequest).subscribe(
    (res) => {
      if (res.status === 'UPDATED') {
        console.log("UPDATED")
      } else {
        console.log("Not Updated")
      }
    },
  );
}
}
