import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import jwtDecode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-choose-payment',
  templateUrl: './choose-payment.component.html',
  styleUrls: ['./choose-payment.component.scss']
})
export class ChoosePaymentComponent implements OnInit {

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmDialogService: ConfirmationService,
    private authService: AuthService,
    private cartService: CartService
  ) { }

  diableConfirm: boolean = true;
  selectedPayment: any = null;
  order: any;
  token: any;
  user_id: any;

  payments: any[] = [
    {name: 'Cash on delivery', key: 'CASH_OD'}, 
    {name: 'Card on delivery', key: 'CARD_OD'}, 
    {name: 'Pay online on delivery', key: 'PON_OD'}
  ];


  ngOnInit(): void {
    this.order = JSON.parse(localStorage.getItem("orderData") || '{}');
    console.log("o data : ", this.order)
    this.token = JSON.parse(localStorage.getItem("userData") || '{}')
    if(this.token){
      let decoded: any = jwtDecode(this.token.token.access)
      this.user_id = decoded['user_id'];
    }
  }

  goToOrderDetails = () => {
    this.router.navigate(['confirmorder/summary'])
  }

  paymentMethodChoose = () => {
    console.log("payment : ", this.selectedPayment)
    this.order.payment_mode = this.selectedPayment.key
    this.diableConfirm = false;
  }

  confirmOrder = () => {
    console.log("order : ", this.order)
    this.confirmDialogService.confirm({
        message: `Are you sure that you want confirm order with " ${this.selectedPayment.name} " payment method?`,
        accept: () => {
            //Actual logic to perform a confirmation
            this.authService.confirmOrder(this.user_id, this.order).subscribe(data => {
                this.messageService.add({severity: 'success', summary: 'Order confirm', 
                                         detail: 'We will notify you on further details'});
                this.cartService.addToCart("");
                localStorage.removeItem("bookcart");
                localStorage.removeItem("bookcartWithAddress");
                localStorage.removeItem("orderData");
                this.router.navigate(['home'])
            }, error => {
                this.selectedPayment = null;
                this.diableConfirm = true;
                this.messageService.add({severity: 'error', summary: 'Unable to confirm order', 
                                       detail: "Can't place order at this time. Please try later."});
            })
        },
        reject: () => {
          this.selectedPayment = null;
          this.diableConfirm = true;
        }
    });
  }

}
