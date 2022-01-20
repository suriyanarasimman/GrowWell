import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private cookieService:CookieService) { }

  ngOnInit(): void {

    if(this.cookieService.check("isRemember")){
      console.log("cookie exixts");
      console.log(this.cookieService.get("userName"));
      console.log(this.cookieService.get("userType"));
      console.log(this.cookieService.get("lastLogin"));
      console.log(this.cookieService.get("registeredDate"));
      // console.log(this.cookieService.get("userName"));
    }
    else{
      console.log("sessionj exixts");
      console.log(sessionStorage.getItem("userName"));
      console.log(sessionStorage.getItem("userType"));
      console.log(sessionStorage.getItem("lastLogin"));
      console.log(sessionStorage.getItem("registeredDate"));

    }
  }

}
