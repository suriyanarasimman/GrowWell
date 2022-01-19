import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  invalidCredentials: Boolean = false;
  validCredentials: Boolean = false;

  submitDetails:Object;
  
  constructor(
    private gs: GeneralService,
    private router: Router,
    private cookieService:CookieService) { }

    togglePassword($event){
      const togglePassword = document.querySelector('#showpassword');
    const password = document.querySelector('#inputPassword');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
    }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl("",Validators.required),
      token: new FormControl("",Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  onSubmit(){
    this.submitDetails={
      "mail":this.form.get("email").value,
      "code":this.form.get("token").value,
      "newpassword":this.form.get("password").value
    }

    this.gs.changePassword(this.submitDetails).subscribe((response)=>{
      this.validCredentials = true;
      setTimeout(()=>{
        this.router.navigate(["/login"]);
      },2000)
    },(error)=>{
      this.invalidCredentials = true;
    });
  }

}
