import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GeneralService } from './../services/general.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userName:any;
  pageLoader=true;

  totalStockPrice: number = 0;
  totalFpPrice: number = 0;
  totalMfPrice:number=0;
  totalMutualFundInvestedAmount:number=0;
  
  financialProductList: any;
  stockList:any;
  mutualFundList:any;

  financialProductPercent:any;
  stockPercent:any;
  mutualFundsInvestedIn=0;

  constructor(private cookieService:CookieService, private RouteService:GeneralService) { 

    
    if(this.cookieService.check("userName")) {
      this.userName=this.cookieService.get("userName");
    }
    else {
      this.userName=sessionStorage.getItem("userName");
    };

  }

  ngOnInit(): void {

    // if(this.cookieService.check("isRemember")){
    //   console.log("cookie exixts");
    //   console.log(this.cookieService.get("userName"));
    //   console.log(this.cookieService.get("userType"));
    //   console.log(this.cookieService.get("lastLogin"));
    //   console.log(this.cookieService.get("registeredDate"));
    //   // console.log(this.cookieService.get("userName"));
    // }
    // else{
    //   console.log("sessionj exixts");
    //   console.log(sessionStorage.getItem("userName"));
    //   console.log(sessionStorage.getItem("userType"));
    //   console.log(sessionStorage.getItem("lastLogin"));
    //   console.log(sessionStorage.getItem("registeredDate"));

    // }

    this.getData();
  }

  getData(){
    
    this.RouteService.productsOwnedByUser(this.userName).subscribe(
      (res)=>{

        this.pageLoader=false;

        this.stockList = res.filter(
          (product) => product.productType === 'STOCK'
        );
        this.financialProductList = res.filter(
          (product) => product.productType === 'FP'
        );

        if (this.stockList != null && this.stockList != undefined) {
          this.stockList.forEach((element) => {
            this.totalStockPrice =
              this.totalStockPrice + element.quantity * element.marketPrice;
          });
        }
        if (
          this.financialProductList != null &&
          this.financialProductList != undefined
        ) {
          this.financialProductList.forEach((element) => {
            this.totalFpPrice = this.totalFpPrice + element.marketPrice;
          });
        }
        this.stockPercent =
          (this.totalStockPrice / (this.totalStockPrice + this.totalFpPrice)) *
          100;
        this.financialProductPercent =
          (this.totalFpPrice / (this.totalStockPrice + this.totalFpPrice)) *
          100;

        // console.log(this.financialProductList,this.totalFpPrice,this.financialProductPercent);
        // console.log(this.stockList,this.totalStockPrice,this.stockPercent)
      },
      (err)=>{

        this.pageLoader = false;

      }
    );


    this.RouteService.mutualFundsOwnedByUser(this.userName).subscribe((res) => {
      this.mutualFundList = res;
      console.log(this.mutualFundList);
      this.mutualFundsInvestedIn = res.length;
      this.mutualFundList.forEach(
        (fund) =>
          (this.totalMutualFundInvestedAmount =
            this.totalMutualFundInvestedAmount + fund.maturityAmount)
      );
    });


    
  
    }

}
