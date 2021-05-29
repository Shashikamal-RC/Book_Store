import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { PrimeNgModule } from './prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

import { CartItemComponent } from './components/cart-item/cart-item.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { OrderConfirmComponent } from './components/order-confirm/order-confirm.component';
import { ChooseDetailsComponent } from './components/order-confirm/choose-details/choose-details.component';
import { ChoosePaymentComponent } from './components/order-confirm/choose-payment/choose-payment.component';
import { OrderSummaryComponent } from './components/order-confirm/order-summary/order-summary.component';
import { UserAddressComponent } from './components/order-confirm/choose-details/user-address/user-address.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    CartComponent,
    OrderComponent,
    ChangePasswordComponent,
    CartItemComponent,
    OrderConfirmComponent,
    ChooseDetailsComponent,
    ChoosePaymentComponent,
    OrderSummaryComponent,
    UserAddressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    DialogService, 
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
