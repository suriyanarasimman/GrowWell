import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray } from '@angular/forms';
  import { GeneralService } from './../services/general.service';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  httpOptions:any;
  isAdded=false;
  isError=false;
  contactForm:FormGroup;
  username=new FormControl('',[Validators.required]);
  phone=new FormControl('',[Validators.required]);
  email=new FormControl('',[Validators.required]);
  message=new FormControl('',[Validators.required]);
  constructor(private Routeservice:GeneralService,private http:HttpClient,private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.contactFormInit();
  }
  contactFormInit(){
    this.contactForm=this.formBuilder.group({
      username:this.username,
      email:this.email,
      phone:this.phone,
      message:this.message
    });
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
