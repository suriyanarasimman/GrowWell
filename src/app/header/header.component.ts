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
    this.cookieService.deleteAll();
    this.router.navigate(['']);
  }
  ngOnInit(): void {
  }

}
