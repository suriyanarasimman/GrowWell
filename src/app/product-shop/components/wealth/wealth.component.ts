import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { GeneralService } from './../../../services/general.service';
declare var $:any;


@Component({
  selector: 'app-wealth',
  templateUrl: './wealth.component.html',
  styleUrls: ['./wealth.component.scss']
})
export class WealthComponent implements OnInit {

  wealthProduct:any=[];
  errors:any;
  pageLoader=true;
  userName:String;
  selectedProductData:any={}
  // @ViewChild('errorModal') errorModal: ElementRef;
  // @ViewChild('successModal') successModal: ElementRef;
  

  constructor(private Routeservice:GeneralService) {

    this.userName=localStorage.getItem("userName");


   }

  ngOnInit(): void {



    this.getProduct();
      



   

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

    // console.log(this.selectedProductData)


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

  getProduct(){

   
    this.Routeservice.fetchFinancialProductList().subscribe((res)=>{
      
      res.filter(data=>{
        if(data.subcategory==="WEALTH"){
          let x=data.productName.split(" ")
          data['productName']=x[0]+" "+x[1];
          data['type']=x[2];

          this.wealthProduct.push(data);
          // console.log(this.wealthProduct);
          this.pageLoader=false;
        }
      })
    })
    

  }

}
