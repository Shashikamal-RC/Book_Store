import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() removeFromCart!: boolean;
  @Input() item!: any;
  
  constructor(
    private cartService : CartService,
    private router : Router
  ) { }

  imageUrl : any;
  quantity : number = 0;

  ngOnInit(): void {
    this.imageUrl = environment.apiUrl + "/product/photo/" + this.item._id;
    this.quantity = this.item.count;
  }

  reloadQuantity(count : number){
    this.quantity += count;
  }

  removeItemFromCart(){
    let cart : any = [];
    if(localStorage.getItem("cart")){
      cart = JSON.parse(localStorage.getItem("cart") || '{}')
    }
    cart.map((product: { _id: any; },index: any) => {
        if(product._id === this.item._id){
            cart.splice(index,1)
        }
    })
    localStorage.setItem("cart", JSON.stringify(cart));

    this.cartService.addToCart("");
  }

  decreaseCount(){
    let cart : any = [];
    if(localStorage.getItem("cart")){
      cart = JSON.parse(localStorage.getItem("cart") || '{}')
    }
    cart.map((product: { _id: any, count : any },index: any) => {
        if(product._id === this.item._id){
            product.count = product.count - 1;
        }
    })
    localStorage.setItem("cart", JSON.stringify(cart));
    this.cartService.addToCart("");
    this.reloadQuantity(-1);
  }

  increaseCount(){
    let cart : any = [];
    if(localStorage.getItem("cart")){
      cart = JSON.parse(localStorage.getItem("cart") || '{}')
    }
    cart.map((product: { _id: any, count : any },index: any) => {
        if(product._id === this.item._id){
            product.count = product.count + 1;
        }
    })
    localStorage.setItem("cart", JSON.stringify(cart));
    this.cartService.addToCart("");
    this.reloadQuantity(1);
  }

  goToItemDetailsPage(){
    this.router.navigate(['customer/item', this.item._id])
  }

}
