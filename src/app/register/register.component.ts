import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { loginFormValidator } from './password.validator';
import { FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray } from '@angular/forms';
import { GeneralService } from './../services/general.service';
declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  countries:any=[];
  states:any=[];
  httpOptions:any;
  userAdded = false;
  userExists = false;
  errors = false;

  registrationForm:FormGroup;
  username=new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(12)]);
  firstname=new FormControl('',[Validators.required]);
  lastname=new FormControl('',[Validators.required]);
  email=new FormControl('',[Validators.required]);
  pan=new FormControl('',[Validators.required,Validators.minLength(10)]);
  password=new FormControl('',[Validators.required]);
  confirmpassword=new FormControl('',[Validators.required]);
  address01=new FormControl('',[Validators.required]);
  address02=new FormControl('',[Validators.required]);
  state=new FormControl(null,[Validators.required]);
  country=new FormControl(null,[Validators.required]);
  postalcode=new FormControl('',[Validators.required,Validators.minLength(6)]);
  type=new FormControl(null,[Validators.required]);
  


  constructor(private Routeservice:GeneralService,private http:HttpClient,private formBuilder: FormBuilder) { }

 

  ngOnInit(): void {
    this.getResgistrationToken();

    this.registrationFormInit();

    $(document).ready(function () {

      var navListItems = $('div.setup-panel div a'),
              allWells = $('.setup-content'),
              allNextBtn = $('.nextBtn'),
              allPrevBtn = $('.prevBtn');
  
      allWells.hide();
  
      navListItems.click(function (e) {
          e.preventDefault();
          var $target = $($(this).attr('href')),
                  $item = $(this);
  
          if (!$item.hasClass('disabled')) {
              navListItems.removeClass('btn-primary').addClass('btn-default');
              $item.addClass('btn-primary');
              allWells.hide();
              $target.show();
              $target.find('input:eq(0)').focus();
          }
      });
 
      //
      allNextBtn.click(function(){
          var curStep = $(this).closest(".setup-content"),
              curStepBtn = curStep.attr("id"),
              nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
              curInputs = curStep.find("input[type='text'],input[type='url'],input[type='email'],input[type='select'],input[type='password']"),
              
              isValid = true;
  
          $(".form-group").removeClass("has-error");
          for(var i=0; i<curInputs.length; i++){
              if (!curInputs[i].validity.valid){
                  isValid = false;
                  $(curInputs[i]).closest(".form-group").addClass("has-error");
              }
          }
  
          if (isValid)
              nextStepWizard.removeAttr('disabled').trigger('click');
      });
  
      allPrevBtn.click(function(){
          var curStep = $(this).closest(".setup-content"),
              curStepBtn = curStep.attr("id"),
              prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");
  
          $(".form-group").removeClass("has-error");
          prevStepWizard.removeAttr('disabled').trigger('click');
      });
  
      $('div.setup-panel div a.btn-primary').trigger('click');
  });

  

  

  }


  CountriesList(token){
    this.httpOptions = {
      headers: new HttpHeaders({
       'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
        
      }),
    };

    this.Routeservice.getCountries(this.httpOptions).subscribe((res)=>{
      res.filter(x=>{
        
        this.countries.push(x.country_name);
      })
      console.log(this.countries);
    })
  }

  getResgistrationToken(){
    var httpOptions = {
      headers: new HttpHeaders({
       'Accept': 'application/json',
       "api-token": "9Uc_GPgtSY0a6cxHIH0ijYSM72pFgGu3Zav5r0tMPbEOyg9_ME2wgjmdlTYhF0rQ8lA",
      "user-email": "bopela8609@unigeol.com"
        
      }),
    };

    this.Routeservice.getToken(httpOptions).subscribe((res)=>{

      console.log(res);
      this.CountriesList(res.auth_token);

    });
  }
  getState(country){
    this.Routeservice.getStates(country,this.httpOptions).subscribe((res)=>{
      this.states=[];
      res.filter(x=>{
        
        this.states.push(x.state_name);
        
      })
    })
    
  }
  registrationFormInit(){

    this.registrationForm=this.formBuilder.group({
      username:this.username,
      firstname:this.firstname,
      lastname:this.lastname,
      email:this.email,
      pan:this.pan,
      password:this.password,
      confirmpassword:this.confirmpassword,
      address01:this.address01,
      address02:this.address02,
      state:this.state,
      country:this.country,
      postalcode:this.postalcode,
      type:this.type,
    },
    { validators: loginFormValidator.validatePassword });

  }

  onSubmit(){
    let customerInfo = {
      userName: this.registrationForm.get('username').value,
      firstName: this.registrationForm.get('firstname').value,
      lastName: this.registrationForm.get('lastname').value,
      email: this.registrationForm.get('email').value,
      organisation:'None',
      panNumber: this.registrationForm.get('pan').value,
      password: this.registrationForm.get('password').value,
      addressLine01: this.registrationForm.get('address01').value,
      addressLine02: this.registrationForm.get('address02').value,
      state: this.registrationForm.get('state').value,
      country: this.registrationForm.get('country').value,
      pincode: Number(this.registrationForm.get('postalcode').value),
      userType: this.registrationForm.get('type').value,
    };

    console.log(customerInfo);

    this.Routeservice.registerUser(customerInfo).subscribe(
      (response) => {
        console.log(response);
        if (response.status === 'ADDED') {
          this.userAdded = true;
        } else {
          this.userExists = true;
        }
      },
      (err) => {
        this.errors = true;
      }
    );
  }
  

}
