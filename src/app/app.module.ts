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
    
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PopoverModule
  ],
  providers: [GeneralService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
