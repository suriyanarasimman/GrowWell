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
import { WealthComponent } from './wealth/wealth.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    StockhistoryComponent,
    WealthComponent,
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [GeneralService],
  bootstrap: [AppComponent,LoginComponent]
})
export class AppModule { }
