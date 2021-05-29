import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit {

  constructor(
  ) { }

  items: MenuItem[] = [];
  activeIndex= 0;

  ngOnInit(): void {
    this.items = [
      {
        label: "Address",
        routerLink: "address"
      },
      {
        label: "Order Summary",
        routerLink: 'summary'
      },
      { 
        label: "Payment",
        routerLink: 'payment'
      }
    ]
  }




}
