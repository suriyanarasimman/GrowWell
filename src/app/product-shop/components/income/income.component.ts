import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { GeneralService } from './../../../services/general.service';
declare var $:any;

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  incomeProduct:any=[];
  errors:any;
  pageLoader=true;
  userName:String;
  selectedProductData:any={}

  constructor(private Routeservice:GeneralService) { 


    this.userName=localStorage.getItem("userName");

  }

  ngOnInit(): void {
    this.getProduct();
      



   

  }

  getProduct(){

   
    this.Routeservice.fetchFinancialProductList().subscribe((res)=>{
      
      res.filter(data=>{
        if(data.subcategory==="INCOME"){
          let x=data.productName.split(" ")
          data['productName']=x[0];
          data['type']=x[1];

          this.incomeProduct.push(data);
          // console.log(this.incomeProduct);
          this.pageLoader=false;
        }
      })
    })
    

  }

  
  confirmProduct(status:boolean){
    if(status){
      this.Routeservice.buyProduct(this.selectedProductData).subscribe((res)=>{
        if(res.status==="EXISTS"){


          // console.log(res);

          $("#errorModal").modal('show');



        }
        else{

          $("#successModal").modal('show');

        }
      }),
      (err)=>{

      }
      

    }
    else {
      this.selectedProductData={};
    }
  
  }

  buyProduct(selectedProduct){

    this.selectedProductData = {
      userName: this.userName,
      productName: selectedProduct.productName,
      productID: selectedProduct.productID,
      productType: selectedProduct.productType,
      subcategory: selectedProduct.subcategory,
      buyPrice: selectedProduct.buyPrice,
      marketPrice:selectedProduct.marketPrice,
      quantity: 1
    };

    // console.log(this.selectedProductData);


  }

}
