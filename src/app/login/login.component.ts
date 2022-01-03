import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {GeneralService} from 'src/app/services/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  constructor(
    private authenticate:GeneralService) {}

  ngOnInit(): void {
    this.form=new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });


  }

  onSubmit(){
    let authenticateRequest = {
      userName: this.form.get('username').value,
      password: this.form.get('password').value,
    };
    console.log(authenticateRequest);
    this.authenticate.authenticateUser(authenticateRequest).subscribe((response) => {
      // if(response.authencticated){
        console.log(response);
      // }
    },
    (error) => {
      console.log("service failed");
    }
    );
  }
}
