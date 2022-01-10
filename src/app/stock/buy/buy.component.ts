import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  stockList: any;
  public selectStocks = 
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
  displayPriceForLimitOrder: boolean = false; //Display Input field for Limit Order Price
  priceErrorBanner: boolean = false; //Price Error Display Banner
  systemUnavailable: boolean = false; //Display Server error
  successBanner: boolean = false; //Display success banner on transaction complete
  buyForm: FormGroup;
  // userName: string = localStorage.getItem('username');
  userName: string = "abc";

  constructor(
    private formBuilder: FormBuilder,
    private productService: GeneralService
  ) {}

  ngOnInit() {
    this.buyForm = this.formBuilder.group({
      stocks: ['select-stock'],
      quantity: ['', Validators.required],
      orderType: ['Select', Validators.required],
      price: [''],
    });
    // this.productService
    //   .fetchStockInformation()
    //   .subscribe((data) => {this.selectStocks = data; console.log(data);});
      
    this.fetchPortfolio();
  }

  fetchPortfolio() {
    this.productService.productsOwnedByUser(this.userName).subscribe(
      (res) => {
        this.stockList = res.filter(
          (product) => product.productType === 'STOCK'
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onOrderTypeChange() {
    if (this.buyForm.get('orderType').value === 'limit') {
      this.displayPriceForLimitOrder = true;
    } else {
      this.displayPriceForLimitOrder = false;
    }
  }

  onPriceChange() {
    this.priceErrorBanner = false;
  }

  onBuyFormSubmit() {
    this.successBanner = false;
    this.systemUnavailable = false;
    if (
      this.buyForm.get('orderType').value === 'limit' &&
      this.buyForm.get('price').value === ''
    ) {
      this.priceErrorBanner = true;
      return null;
    }
    let stockDetail = "abc.abc company = $785";
    let stockTicker = stockDetail.slice(0, 3);
    let stockName = stockDetail.substring(
      stockDetail.lastIndexOf('.') + 1,
      stockDetail.lastIndexOf('-')
    );
    let currentMarketPrice = stockDetail.slice(stockDetail.length - 3);
    let limitOrderPrice = currentMarketPrice;
    if (this.buyForm.get('orderType').value === 'limit') {
      limitOrderPrice = this.buyForm.get('price').value;
    }
    let buyOrderRequest = {
      userName: this.userName,
      productName: stockName,
      productID: stockTicker,
      productType: 'STOCK',
      subcategory: 'STOCK',
      buyPrice: limitOrderPrice,
      marketPrice: currentMarketPrice,
      quantity: this.buyForm.get('quantity').value,
    };
    this.productService.buyProduct(buyOrderRequest).subscribe(
      (res) => {
        this.successBanner = true;
        this.buyForm.reset();
        this.fetchPortfolio();
      },
      (err) => {
        this.systemUnavailable = true;
      }
    );
  }
}
