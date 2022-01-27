import { Component, OnInit,ElementRef, ViewChild, AfterViewInit  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';
import {CookieService} from 'ngx-cookie-service';

import { Router } from '@angular/router';
declare var $:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  target:any;
  form: FormGroup;
  invalidCredentials: Boolean = false;
  isRemember:Boolean=false;
  constructor(
    private authenticate: GeneralService,
    private router: Router,
    private cookieService:CookieService) {

      if(this.cookieService.check('userName')==true) {
        this.router.navigate(['/dashboard']);
      }
      else if(sessionStorage.hasOwnProperty("userName")==true) this.router.navigate(['/dashboard']);
     }

    togglePassword($event){
      const togglePassword = document.querySelector('#showpassword');
    const password = document.querySelector('#inputPassword');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
    }


  ngOnInit(): void {


    this.form = new FormGroup({
      username: new FormControl("",Validators.required),
      password: new FormControl("", Validators.required),
      
    });


    this.target=<HTMLElement>document.getElementById('inputUsername');
    this.target.focus();
  

  }
  

  onSubmit() {
    let authenticateRequest = {
      userName: this.form.get('username').value,
      password: this.form.get('password').value,
      rememberMe: this.isRemember
    };
    
    this.authenticate.authenticateUser(authenticateRequest).subscribe((response) => {
      
      if (response.authenticated) {
        if(this.isRemember){
          
          const dateNow = new Date();
          dateNow.setDate(dateNow.getDate() + 15);
          this.cookieService.set("userName", response.userName, dateNow);
          this.cookieService.set("userType", response.userType, dateNow);
          this.cookieService.set("authenticated", response.authenticated, dateNow);
          this.cookieService.set('registeredDate', response.userFrom,dateNow);
          this.cookieService.set('lastLogin',response.lastLoginDate,dateNow);
          this.cookieService.set("isRemember","True",dateNow);

        }
        else if(!this.isRemember){
          
          sessionStorage.setItem("userName", response.userName);
          sessionStorage.setItem("userType", response.userType);
          sessionStorage.setItem("authenticated", response.authenticated);
          sessionStorage.setItem("isRemember","False");
          sessionStorage.setItem('lastLogin',response.lastLoginDate);
          sessionStorage.setItem('registeredDate', response.userFrom);

       
        }
        
        this.router.navigate(['/dashboard']);
      }
      else {
        this.invalidCredentials=true;
      }
    },
      (error) => {
        console.log("service failed");
      }
    );
  }
}
