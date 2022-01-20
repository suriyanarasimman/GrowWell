import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { FooterComponent } from './footer/footer.component';

import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { GeneralService } from './services/general.service';
import { RegisterComponent } from './register/register.component';

import { StockhistoryComponent } from './stockhistory/stockhistory.component';
import { FormsModule } from '@angular/forms';
import { ProductShopComponent } from './product-shop/product-shop.component';
import { WealthComponent } from './product-shop/components/wealth/wealth.component';
import { IncomeComponent } from './product-shop/components/income/income.component';
import {PopoverModule} from "ngx-smart-popover";
import { HomeComponent } from './home/home.component';

import { MutualFundsComponent } from './mutual-funds/mutual-funds.component';
import { FiltersComponent } from './mutual-funds/filters/filters.component';
import { PortfolioComponent } from './mutual-funds/portfolio/portfolio.component';
import { CartComponent } from './mutual-funds/cart/cart.component';

import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { ModalComponent } from './mutual-funds/modal/modal.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './login/change-password/change-password.component';
import {CookieService} from 'ngx-cookie-service';
import { NotfoundComponent } from './notfound/notfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    StockhistoryComponent,
    ProductShopComponent,
    WealthComponent,
    IncomeComponent,
    HomeComponent,
    
    MutualFundsComponent,
    FiltersComponent,
    PortfolioComponent,
    CartComponent,
    ModalComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    NotfoundComponent,
    DashboardComponent
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PopoverModule,
    NgxSliderModule
  ],
  providers: [CookieService,GeneralService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
