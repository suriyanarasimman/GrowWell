import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  stockList: any;
  displayBuy: boolean = false;
  displaySell: boolean = false;
  // username: string = localStorage.getItem('username');
  username: string = localStorage.getItem('userName');;

  constructor(private productService: GeneralService) {}

  ngOnInit() {
    this.fetchPortfolio();
  }

  fetchPortfolio() {
    this.productService.fetchStockHistory(this.username).subscribe(
      (res) => {
        console.log(res)
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
