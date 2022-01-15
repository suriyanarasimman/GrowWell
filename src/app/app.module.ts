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
import { StockComponent } from './stock/stock.component';
import { BuyComponent } from './stock/buy/buy.component';
import { SellComponent } from './stock/sell/sell.component';
import { HistoryComponent } from './stock/history/history.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    StockhistoryComponent,
    StockComponent,
    BuyComponent,
    SellComponent,
    HistoryComponent,
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [GeneralService],
  bootstrap: [AppComponent]
})
export class AppModule { }
