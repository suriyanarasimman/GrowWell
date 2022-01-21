import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  userName:String;
  funds:Array<Object>;

  constructor(private gs:GeneralService, private cookieService:CookieService) {
    if(this.cookieService.check("userName")) {
      this.userName=this.cookieService.get("userName");
    }
    else {
      this.userName=sessionStorage.getItem("userName");
    };
   }

  ngOnInit(): void {
    this.gs.mutualFundsOwnedByUser(this.userName).subscribe((response)=>{
      this.funds=response;
    },
    (error)=>{
      console.log(error);
    })
  }

  ngOnChanges():void{
    this.gs.mutualFundsOwnedByUser(this.userName).subscribe((response)=>{
      this.funds=response;
    },
    (error)=>{
      console.log(error);
    })
  }

}
