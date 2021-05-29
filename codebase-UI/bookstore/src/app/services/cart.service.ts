import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  cart = new BehaviorSubject<any>({});
  remove = new BehaviorSubject<any>("");


  addToCart = (item : any) => {
    return this.cart.next(item);
  }

  removeFromcart = (itemId : any) => {
    return this.remove.next(itemId) 
  }
}
