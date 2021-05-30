import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { DialogService } from 'primeng/dynamicdialog';

import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private cartService : CartService,
    private authService: AuthService,
    private dialogService: DialogService
  ) { }

  cart : any = [];
  totalPrice: number = 0;
  discount : number = 0;
  deliveryCharge : number = 0;

  isAuthenticated: boolean = false;

  ngOnInit(): void {
    this.cartService.cart.subscribe(data => {
      this.cartItems();
    })

    this.authService.getAuthentication().subscribe(data => {
      this.isAuthenticated = data;
    })

    this.isAuthenticated = (localStorage.getItem("isAuthenticated") === "true") ? true : false || false;

    console.log("is auth ", this.isAuthenticated)
    
  }

  cartItems = () => {
    this.cart = JSON.parse(localStorage.getItem("bookcart") || '{}');
    this.totalPrice = 0;
    if(this.cart.length > 0){
      this.cart.map((item : any) => {
        this.totalPrice += item.price * item.count ;
      })
    }
  }

  confirm_order = () => {
    //
  }

  signintocontinue = () => {
    const ref = this.dialogService.open(SignInComponent, {
      data: "",
      header: "Sign In",
      width: '70%'
    })

    ref.onClose.subscribe((data: any) => {
      //
    })
  }

  registertocontinue = () => {
    const ref = this.dialogService.open(SignUpComponent, {
      data: "",
      header: "Register",
      width: '70%'
    })

    ref.onClose.subscribe((data: any) => {
      //
    })
  }

}
