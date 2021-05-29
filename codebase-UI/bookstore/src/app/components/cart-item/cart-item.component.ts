import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

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
    private router : Router,
    private messageService: MessageService,
    private confirmDialogService: ConfirmationService
  ) { }

  quantity : number = 0;

  ngOnInit(): void {
    this.quantity = this.item.count;
  }

  reloadQuantity(count : number){
    this.quantity += count;
  }

  removeItem = () => {
      this.confirmDialogService.confirm({
          message: `Are you sure that you want to delete ${this.item?.title} from cart?`,
          accept: () => {
              //Actual logic to perform a confirmation
              this.removeItemFromCart();
          }
      });
  }

  removeItemFromCart(){
    let cart : any = [];
    if(localStorage.getItem("bookcart")){
      cart = JSON.parse(localStorage.getItem("bookcart") || '{}')
    }
    cart.map((product: { id: any; },index: any) => {
        if(product.id === this.item.id){
            cart.splice(index,1)
        }
    })
    localStorage.setItem("bookcart", JSON.stringify(cart));

    this.cartService.addToCart("");

    this.messageService.add({severity: 'info', summary: 'Item Deleted', detail: `${this.item?.title} deleted from cart`});
  }

  decreaseCount(){
    let cart : any = [];
    if(localStorage.getItem("bookcart")){
      cart = JSON.parse(localStorage.getItem("bookcart") || '{}')
    }
    cart.map((product: { id: any, count : any },index: any) => {
        if(product.id === this.item.id){
            product.count = product.count - 1;
        }
    })
    localStorage.setItem("bookcart", JSON.stringify(cart));
    this.cartService.addToCart("");
    this.reloadQuantity(-1);
  }

  increaseCount(){
    let cart : any = [];
    if(localStorage.getItem("cart")){
      cart = JSON.parse(localStorage.getItem("bookcart") || '{}')
    }
    cart.map((product: { id: any, count : any },index: any) => {
        if(product.id === this.item.id){
            product.count = product.count + 1;
        }
    })
    localStorage.setItem("bookcart", JSON.stringify(cart));
    this.cartService.addToCart("");
    this.reloadQuantity(1);
  }

  goToItemDetailsPage(){
    this.router.navigate(['customer/item', this.item.id])
  }

}
