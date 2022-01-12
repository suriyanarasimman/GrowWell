import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StockhistoryComponent } from './stockhistory/stockhistory.component';
import { ProductShopComponent } from './product-shop/product-shop.component';
import { WealthComponent } from './product-shop/components/wealth/wealth.component';
import { IncomeComponent } from './product-shop/components/income/income.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path: "stockhistory",component:StockhistoryComponent},
  {path:"shop",component:ProductShopComponent},
  {path:"wealth",component:WealthComponent},
  {path:"income",component:IncomeComponent},
  {path:"home",component:HomeComponent}



]



@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
