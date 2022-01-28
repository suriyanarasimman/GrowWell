import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  httpOptions:any;
  isAdded=false;
  name:String;
  isError=false;
  contactForm:FormGroup;
  username=new FormControl('',[Validators.required]);
  phone=new FormControl('',[Validators.required]);
  email=new FormControl('',[Validators.required]);
  message=new FormControl('',[Validators.required]);
  constructor(private Routeservice:GeneralService,private http:HttpClient,private formBuilder: FormBuilder,private cookieService:CookieService,private router:Router) {

    if(this.cookieService.check('userName')==true) {
      this.router.navigate(['/dashboard']);
    }
    else if(sessionStorage.hasOwnProperty("userName")==true) this.router.navigate(['/dashboard']);

    if(this.cookieService.check("userName")) {
      this.name=this.cookieService.get("userName");
    }
    else {
      this.name=sessionStorage.getItem("userName");
    };

   }

  ngOnInit(): void {

    this.contactFormInit();
    this.getDetails();
    
  }
  contactFormInit(){
    this.contactForm=this.formBuilder.group({
      username:this.username,
      email:this.email,
      phone:this.phone,
      message:this.message
    });
  }

  getDetails(){
    this.Routeservice.getUserDetails(this.name).subscribe((res) => {
      this.contactForm.get("username").patchValue(res.name);
      this.contactForm.get("email").patchValue(res.email);
      this.contactForm.get("phone").patchValue(res.phone);
    })
  }

  reset(){
    this.isAdded=false;
    this.isError=false;
  }


  sendContactUs(){
    this.isAdded=false;
    this.isError=false;
    let contactInfo={
      userName:this.contactForm.get('username').value,
      email:this.contactForm.get('email').value,
      phoneNumber:this.contactForm.get('phone').value,
      message:this.contactForm.get('message').value,
    }

    this.Routeservice.registerMessage(contactInfo).subscribe((res)=>{
      if(res.status=="ADDED") {
        this.isAdded=true;
        this.contactForm.reset();
      }
    },
    (err)=>{
      this.isError=true;
    })
  }


}
