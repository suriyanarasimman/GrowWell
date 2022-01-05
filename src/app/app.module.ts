import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { MutualFundsComponent } from './mutual-funds/mutual-funds.component';
import { FiltersComponent } from './mutual-funds/filters/filters.component';
import { PortfolioComponent } from './mutual-funds/portfolio/portfolio.component';
import { CartComponent } from './mutual-funds/cart/cart.component';

import { NgxSliderModule } from "@angular-slider/ngx-slider";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    StockhistoryComponent,
    MutualFundsComponent,
    FiltersComponent,
    PortfolioComponent,
    CartComponent,
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSliderModule
  ],
  providers: [GeneralService],
  bootstrap: [AppComponent,LoginComponent]
})
export class AppModule { }
