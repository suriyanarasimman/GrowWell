import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  stockList: any;
  displayBuy: boolean = false;
  displaySell: boolean = false;
  // username: string = localStorage.getItem('username');
  username;



  constructor(private productService: GeneralService, private cookieService: CookieService) {
    this.username=this.cookieService.get("userName");
  }

  ngOnInit() {
    this.fetchPortfolio();
  }

  fetchPortfolio() {
    this.productService.productsOwnedByUser(this.username).subscribe(
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

}
