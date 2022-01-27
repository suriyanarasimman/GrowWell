import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/routerGuard/auth.guard';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StockhistoryComponent } from './stockhistory/stockhistory.component';
import { ProductShopComponent } from './product-shop/product-shop.component';
import { WealthComponent } from './product-shop/components/wealth/wealth.component';
import { IncomeComponent } from './product-shop/components/income/income.component';
import { MutualFundsComponent } from './mutual-funds/mutual-funds.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';



const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
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
    path:'**',
    component:NotfoundComponent
  },
  



]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
