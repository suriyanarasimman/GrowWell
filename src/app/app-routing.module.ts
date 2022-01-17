import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StockhistoryComponent } from './stockhistory/stockhistory.component';
import { MutualFundsComponent } from './mutual-funds/mutual-funds.component';

const routes: Routes = [
  // {path:""},

  {path:"login", component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path: "stockhistory",component:StockhistoryComponent},
  {path: "mutualfunds",component:MutualFundsComponent}


]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
