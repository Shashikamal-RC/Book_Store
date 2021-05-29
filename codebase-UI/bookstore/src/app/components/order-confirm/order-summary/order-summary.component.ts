import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  cartItems : any;
  totalPrice: number = 0;

  ngOnInit(): void {
    this.fetchCartItems();
  }


  fetchCartItems = () => {
    this.cartItems = JSON.parse(localStorage.getItem("bookcart") || '{}');
    this.totalPrice = 0;
    this.cartItems.map((item : any) => {
      this.totalPrice += item.price * item.count ;
    })
  }

  goToAdressDetails = () => {
    this.router.navigate(['confirmorder/address'])
  }

  goToPayment = () => {
    this.router.navigate(['confirmorder/payment'])
  }
}
