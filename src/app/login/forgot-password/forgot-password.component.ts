import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  invalidCredentials: Boolean = false;
  validCredentials: Boolean = false;

  constructor(
    private gs: GeneralService,
    private router: Router,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.email, Validators.required]),
    });
  }

  onSubmit(){
    this.gs.forgotPassword(this.form.get("email").value).subscribe((response)=>
    {
      this.validCredentials=true;
      setTimeout(()=>{
        this.router.navigate(["/change-password"]);
      },2000)
    },
    (error)=>{
      this.invalidCredentials=true;
    });
  }

}
