import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { UserAddressComponent } from './user-address/user-address.component';


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
  ) {

  }

  token: any;
  userDetails: any;
  selectedValue: any;
  user_id: any;
  disableNext: boolean = true;

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem("userData") || '{}')
    if(this.token){
      let decoded: any = jwtDecode(this.token.token.access)
      this.user_id = decoded['user_id'];
      this.fetchUserProfile(decoded['user_id']);
    }
  }

  selectedAddress = () => {
    console.log("selectedValue", this.selectedValue)
    if(this.selectedValue !== undefined){
      this.disableNext = false;
    }else{
      this.disableNext = true;
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

  resetDetails = () => {
    //
  }

  onSubmit = () => {
    //
  }

  goToOrderSummary = () => {
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

}
