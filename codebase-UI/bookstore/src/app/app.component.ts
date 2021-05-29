import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';
import jwt_decode, { JwtPayload } from "jwt-decode";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private cardSub! : Subscription;
  private userSub! : Subscription;

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private cartService : CartService,
    private authService: AuthService
  ){}

  title = 'bookstore';
  isAuthenticated: boolean = false;
  isAdmin: boolean = true;
  cartItems : string = "0";
  token: any;

  ngOnInit(){
    this.cardSub = this.cartService.cart.subscribe(data => {
      this.cartItems = JSON.parse(localStorage.getItem("bookcart") || '{}').length;      
    })

    this.authService.getAuthentication().subscribe(data => {
      this.isAuthenticated = data;
    })

    console.log(localStorage.getItem("isAuthenticated"))
    this.isAuthenticated = (localStorage.getItem("isAuthenticated") === "true") ? true : false || false;

    this.token = JSON.parse(localStorage.getItem("userData") || '{}')
    if(this.token){
      this.token = this.token.access;
    }
    console.log(jwt_decode(this.token))
  }

  signIn = () => {
    const ref = this.dialogService.open(SignInComponent, {
      data: "",
      header: "Sign In",
      width: '70%'
    })

    ref.onClose.subscribe((data: any) => {
      //
    })
  }

  signUp = () => {
    const ref = this.dialogService.open(SignUpComponent, {
      data: "",
      header: "Register",
      width: '70%'
    })

    ref.onClose.subscribe((data: any) => {
      //
    })
  }

  changePassword = () => {
    const ref = this.dialogService.open(ChangePasswordComponent, {
      data: "",
      header: "Change Password",
      width: '70%'
    })

    ref.onClose.subscribe((data: any) => {
      //
    })
  }

  logout = () => {
    this.authService.logout();
  } 

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.cardSub.unsubscribe();
  }

}
