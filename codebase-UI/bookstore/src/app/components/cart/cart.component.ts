import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private cartService : CartService
  ) { }

  cart : any = [];
  totalPrice: number = 0;
  discount : number = 0;
  deliveryCharge : number = 0;

  ngOnInit(): void {
    this.cartService.cart.subscribe(data => {
      this.cartItems();
    })
  }

  cartItems = () => {
    this.cart = JSON.parse(localStorage.getItem("cart") || '{}');
    this.totalPrice = 0;
    this.cart.map((item : any) => {
      this.totalPrice += item.price * item.count ;
    })
  }

  confirm_order = () => {
    //
  }

}
