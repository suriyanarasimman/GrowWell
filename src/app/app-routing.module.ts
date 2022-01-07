import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BuyComponent } from './stock/buy/buy.component';
import { SellComponent } from './stock/sell/sell.component';
import { StockComponent } from './stock/stock.component';
import { StockhistoryComponent } from './stockhistory/stockhistory.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path: "stockhistory",component:StockhistoryComponent},
  {path:"", component:StockComponent},
  {path:"buy",component:BuyComponent},
  {path:"sell", component: SellComponent},


]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
