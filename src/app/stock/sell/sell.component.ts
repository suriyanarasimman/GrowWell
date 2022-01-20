import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { GeneralService } from 'src/app/services/general.service';
import { IStocks } from 'src/app/services/IStocks';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {
  fullName: String;


  userName: string = localStorage.getItem('userName');;
  displayPriceForLimitOrder: boolean = false;
  searchInput: String = '';
  price: number;
  pricesent:number;
  Quantity:number = 1;
  Limit:number;
  QuantityLimit:number = 1;
  searchResult: any;
  ordType:String = "Market Order";
  symbol:String;
  first: number =0;

  constructor(private generalService: GeneralService, private cookieService: CookieService) {
    if(this.cookieService.check("userName")) {
      this.userName=this.cookieService.get("userName");
    }
    else {
      this.userName=sessionStorage.getItem("userName");
    };
   
  }

  ngOnInit() {
   
  }

  datecalled(){
    console.log(this.searchInput)
    this.fullName = this.searchInput
    for (var i = 0; i < this.searchResult.length; i++){
      if (this.searchResult[i].productName == this.searchInput){
        this.price = this.searchResult[i].marketPrice;
        this.Limit = this.searchResult[i].marketPrice;
        this.pricesent = this.price;
        this.symbol = this.searchResult[i].productID;
        this.QuantityLimit = this.searchResult[i].quantity;
        console.log(this.price)
        console.log(this.Quantity)
      }
    }
  }

  fetchSeries(){
    if(this.first === 0){
    this.generalService.productsOwnedByUser(this.userName).subscribe(
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

  onOrderTypeChange(str:String) {
    if (str === "limit") {
      this.displayPriceForLimitOrder = true;
      this.ordType= str;
    } else {
      this.displayPriceForLimitOrder = false;
      this.ordType= str;
    }
  }
  onSellFormSubmit() {
    if(!this.displayPriceForLimitOrder){this.pricesent = this.Limit;}
    let sellOrderRequest = {
      userName: this.userName,
      productName: this.fullName,
      productID: this.symbol,
      productType: 'STOCK',
      subcategory: 'STOCK',
      buyPrice: this.pricesent,
      marketPrice: this.price,
      quantity: this.Quantity,
    };
    this.generalService.sellProduct(sellOrderRequest).subscribe(
      (res) => {
        if (res.status === 'UPDATED') {
          console.log("UPDATED")
        } else {
          console.log("Not Updated")
        }
      },
    );
  }
  addQuantity(){
    if(this.Quantity < this.QuantityLimit)
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
