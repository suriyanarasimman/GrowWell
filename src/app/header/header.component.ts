import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private cookieService:CookieService,
    private router:Router) { }

  Logout(){
    if(this.cookieService.check("userName")) this.cookieService.deleteAll();
    else sessionStorage.clear();
  
    this.router.navigate(['']);
  }
  ngOnInit(): void {
  }

}
