import { Component, OnInit } from '@angular/core';
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

  form: FormGroup;
  invalidCredentials: Boolean = false;
  isRemember:Boolean=false;
  constructor(
    private authenticate: GeneralService,
    private router: Router,
    private cookieService:CookieService) { }

    togglePassword($event){
      const togglePassword = document.querySelector('#showpassword');
    const password = document.querySelector('#inputPassword');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
    }


  ngOnInit(): void {

    
    window.onbeforeunload = () => {
      if(this.cookieService.get('isRemember')=="False"){
        console.log('inside close');
        this.cookieService.deleteAll();
      }
    }

    this.form = new FormGroup({
      username: new FormControl("",Validators.required),
      password: new FormControl("", Validators.required),
      
    });


    // localStorage.clear();
    // this.cookieService.deleteAll();
  
    console.log(this.cookieService.check('userName'));
    console.log(this.cookieService.check('userType'));
    console.log(this.cookieService.check('authenticated'));


  }
 

  onSubmit() {
    let authenticateRequest = {
      userName: this.form.get('username').value,
      password: this.form.get('password').value,
      rememberMe: this.isRemember
    };
    console.log(authenticateRequest);
    this.authenticate.authenticateUser(authenticateRequest).subscribe((response) => {
      console.log(response)
      if (response.authenticated) {
        if(this.isRemember){
          //cookies to be implemented
          console.log("inside remeber ");
          const dateNow = new Date();
          dateNow.setDate(dateNow.getDate() + 15);
          this.cookieService.set("userName", response.userName, dateNow);
          this.cookieService.set("userType", response.userType, dateNow);
          this.cookieService.set("authenticated", response.authenticated, dateNow);
          this.cookieService.set("isRemember","True");
        }
        else if(!this.isRemember){
          console.log("inside not remeber ");
          this.cookieService.set("userName", response.userName);
          this.cookieService.set("userType", response.userType);
          this.cookieService.set("authenticated", response.authenticated);
          this.cookieService.set("isRemember","False");
        }
        
        this.router.navigate(['/shop']);
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
