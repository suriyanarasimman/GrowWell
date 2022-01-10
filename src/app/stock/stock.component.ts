import { Component, OnInit } from '@angular/core';
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
  username: string = "abc";

  constructor(private productService: GeneralService) {}

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
