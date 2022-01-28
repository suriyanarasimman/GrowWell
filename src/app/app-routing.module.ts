import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/routerGuard/auth.guard';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BuyComponent } from './stock/buy/buy.component';
import { HistoryComponent } from './stock/history/history.component';
import { MarketComponent } from './stock/market/market.component';
import { SellComponent } from './stock/sell/sell.component';
import { StockComponent } from './stock/stock.component';
import { StockhistoryComponent } from './stockhistory/stockhistory.component';
import { ProductShopComponent } from './product-shop/product-shop.component';
import { WealthComponent } from './product-shop/components/wealth/wealth.component';
import { IncomeComponent } from './product-shop/components/income/income.component';
import { MutualFundsComponent } from './mutual-funds/mutual-funds.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './login/change-password/change-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactComponent } from './contact/contact.component';



const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    
  },
  {
    path:"stock", 
    component:StockComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"buy",
    component:BuyComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"sell", 
    component: SellComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"history", 
    component: HistoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"market", 
    component: MarketComponent,
    canActivate: [AuthGuard]
  },
 
  {
    path:"forgot-password",
    component:ForgotPasswordComponent,
    
  },
  {
    path:"change-password",
    component:ChangePasswordComponent,
    
  },

  
  {
    path:"dashboard",
    component:DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"login", 
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path: "stockhistory",
    component:StockhistoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"shop",
    component:ProductShopComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"wealth",
    component:WealthComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"income",
    component:IncomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "mutualfunds",
    component:MutualFundsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path: "contact",
    component:ContactComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'**',
    component:NotfoundComponent
  },
  
  



]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
