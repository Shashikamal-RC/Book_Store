import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss']
})
export class UserAddressComponent implements OnInit {
  addressForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private authService: AuthService
  ) {     
    this.addressForm = this.formBuilder.group({
      street_address: new FormControl('', Validators.required),
      address_line_2: new FormControl(),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zip_code: new FormControl(null, Validators.required)
    }) 

    console.log("data : ", this.config.data)
    if(this.config.data.data){
      this.setFormData();
    }
  }

  setFormData = () => {
    this.addressForm.reset({
      street_address: this.config.data.data.street_address,
      address_line_2: this.config.data.data.address_line_2,
      city: this.config.data.data.city,
      state: this.config.data.data.state,
      zip_code: this.config.data.data.zip_code
    })
  }

  ngOnInit(): void {}

  onSubmit = () => {
    if(this.config.data.data){
      this.updateAddress();
    }else{
      this.addAddressToUser();
    }
  }


  addAddressToUser = () => {
    let postData = {
      addresses: [this.addressForm.value]
    }
    this.authService.patchUserProfile(this.config.data.user_id, postData).subscribe(data => {
      console.log("address added")
      this.ref.close()
    }, error => {
      console.log("something went wrong")
    })
  }

  updateAddress = () => {
    this.authService.updateAddress(this.config.data.user_id, this.config.data.data.id, this.addressForm.value).subscribe(data => {
      console.log("address updated")
      this.ref.close()
    }, error => {
      console.log("something went wrong")
    })
  }

  resetDetails = () => {
    if(this.config.data){
      this.setFormData();
    }else{
      this.addressForm.reset();
    }
  }

}
