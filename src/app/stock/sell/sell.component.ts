import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';
import { IStocks } from 'src/app/services/IStocks';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {
  fullName: String;


  userName: string = "abc";
  displayPriceForLimitOrder: boolean = false;
  searchInput: String = '';
  price: number;
  Quantity:number;
  QuantityLimit:number = 1;
  searchResult: any;
  ordType:String = "Market Order";
  symbol:String;
  first: number =0;

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
      if (this.searchResult[i].productName == this.searchInput){
        this.price = this.searchResult[i].marketPrice;
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

    let sellOrderRequest = {
      userName: this.userName,
      productName: this.fullName,
      productID: this.symbol,
      productType: 'STOCK',
      subcategory: 'STOCK',
      buyPrice: this.price,
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
 

}
