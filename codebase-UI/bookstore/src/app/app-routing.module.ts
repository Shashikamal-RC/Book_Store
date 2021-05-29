import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { OrderConfirmComponent } from './components/order-confirm/order-confirm.component';
import { ChooseDetailsComponent } from './components/order-confirm/choose-details/choose-details.component';
import { ChoosePaymentComponent } from './components/order-confirm/choose-payment/choose-payment.component';
import { OrderSummaryComponent } from './components/order-confirm/order-summary/order-summary.component';


const routes: Routes = [
  { path:'', redirectTo:'home', pathMatch:'full'},
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'myorder', component: OrderComponent },
  { path: 'confirmorder', component: OrderConfirmComponent , children: [
    { path:'', redirectTo:'address', pathMatch:'full'},
    { path: 'address', component: ChooseDetailsComponent },
    { path: 'summary', component: OrderSummaryComponent },
    { path: 'payment', component: ChoosePaymentComponent }
  ]},
  { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
