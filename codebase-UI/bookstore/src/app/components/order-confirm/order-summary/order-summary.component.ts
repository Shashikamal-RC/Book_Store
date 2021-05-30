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

  orderDetails: any;

  ngOnInit(): void {
    this.fetchCartItems();
  }


  fetchCartItems = () => {
    this.orderDetails = JSON.parse(localStorage.getItem("bookcartWithAddress") || '{}');
  }

  goToAdressDetails = () => {
    this.router.navigate(['confirmorder/address'])
  }

  goToPayment = () => {
    this.router.navigate(['confirmorder/payment'])
  }
}
