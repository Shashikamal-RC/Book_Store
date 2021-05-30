import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { UserAddressComponent } from './user-address/user-address.component';
import { UserContactComponent } from './user-contact/user-contact.component';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-choose-details',
  templateUrl: './choose-details.component.html',
  styleUrls: ['./choose-details.component.scss']
})
export class ChooseDetailsComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmDialogService: ConfirmationService
  ) {

  }

  token: any;
  userDetails: any;
  selectedValue: any;
  user_id: any;
  disableNext: boolean = true;
  cart: any;
  totalPrice: number = 0;
  orderData = {
    books: [{}],
    amount: 0,
    address: 0,
    payment_mode: null
  };

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem("userData") || '{}')
    if(this.token){
      let decoded: any = jwtDecode(this.token.token.access)
      this.user_id = decoded['user_id'];
      this.fetchUserProfile(decoded['user_id']);
      this.cartItems();
      localStorage.removeItem("orderData")
    }
  }

  fetchUserProfile = (user_id: any) => {
    this.authService.fetchUserProfile(user_id).subscribe(data => {
      this.userDetails = data;
      console.log("user details : ", this.userDetails.addresses)
    }, error => {
      console.log("profile details not found")
    })
  }

  cartItems = () => {
    this.cart = JSON.parse(localStorage.getItem("bookcart") || '{}');
    this.totalPrice = 0;
    if(this.cart.length > 0){
      this.orderData.books.pop();
      this.cart.map((item : any) => {
        this.totalPrice += item.price * item.count ;
        this.orderData.books.push({
          book: item.id,
          count: item.count,
          price: item.price
        })
      })
    }
    this.orderData.amount = this.totalPrice;
  }

  goToOrderSummary = () => {
    console.log("order details : ", this.orderData)
    this.router.navigate(['confirmorder/summary'])
  }

  addressDetails = (data: any) => {
    const ref = this.dialogService.open(UserAddressComponent, {
      data: {data, user_id: this.user_id},
      header: "Add new address",
      width: '70%'
    })

    ref.onClose.subscribe((data: any) => {
      this.fetchUserProfile(this.user_id);
    })
  }
  

  updateContactInfo = (data: any) => {
    const ref = this.dialogService.open(UserContactComponent, {
      data: {data, user_id: this.user_id},
      header: "Update contact information",
      width: '40%'
    })

    ref.onClose.subscribe((data: any) => {
      this.fetchUserProfile(this.user_id);
    })
  }

  selectedAddress = (address: any) => {
    this.confirmDialogService.confirm({
        message: `Are you sure you want us to deliver to selected address?`,
        accept: () => {  
            this.disableNext = false;
            this.orderData.address = parseInt(this.selectedValue);
            localStorage.setItem("orderData", JSON.stringify(this.orderData));
            let cart = {
              details: this.cart,
              address: address
            }
            localStorage.setItem("bookcartWithAddress", JSON.stringify(cart));
        },
        reject: () => {
            this.disableNext = true;
            this.selectedValue = null;
            this.messageService.add({severity: 'warn', summary: 'Address required', detail: 'Please choose address to continue with you order'});
        }
    });
  }

}
