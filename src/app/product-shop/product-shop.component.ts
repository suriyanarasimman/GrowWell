import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { GeneralService } from './../services/general.service';
declare var $;

@Component({
  selector: 'app-product-shop',
  templateUrl: './product-shop.component.html',
  styleUrls: ['./product-shop.component.scss']
})
export class ProductShopComponent implements OnInit {

  today: number = Date.now();
  wealthProduct=[];
  incomeProduct=[];
  errors=false;

  constructor(private Routeservice:GeneralService) { }

  ngOnInit(): void {

    this.Routeservice.fetchFinancialProductList().subscribe(
      (response) => {
        // console.log(response);
        var data=response
        data.filter(x=>{
          if(x.subcategory=="WEALTH") this.wealthProduct.push(x.productName);
          if(x.subcategory=="INCOME") this.incomeProduct.push(x.productName);

        })

        // console.log(this.wealthProduct,this.incomeProduct);
        
        
      },
      (err) => {
        this.errors = true;
      }
    );
    
    
  }

}
