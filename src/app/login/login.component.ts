import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  invalidCredentials: Boolean = false;
  rememberMe:Boolean=false;
  constructor(
    private authenticate: GeneralService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl("",Validators.required),
      password: new FormControl("", Validators.required),
      rememberMe: new FormControl()
    });


  }

  onSubmit() {
    let authenticateRequest = {
      userName: this.form.get('username').value,
      password: this.form.get('password').value,
      rememberMe: this.form.get('rememberMe').value,
    };
    console.log(authenticateRequest);
    this.authenticate.authenticateUser(authenticateRequest).subscribe((response) => {
      console.log(response)
      if (response.authenticated) {
        if(this.rememberMe){
          //cookies to be implemented
        }
        localStorage.setItem("userName", response.userName);
        localStorage.setItem("userType", response.userType);
        localStorage.setItem("authenticated", response.authenticated);
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
