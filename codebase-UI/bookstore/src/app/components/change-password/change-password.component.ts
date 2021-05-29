import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { PasswordChecker } from 'src/app/custom-validators/password-match';
import { AuthService } from 'src/app/services/auth.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {


  changePasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private ref: DynamicDialogRef,
    private messageService: MessageService
  ) {
    this.changePasswordForm = this.formBuilder.group({
      current_password: new FormControl('', Validators.required),
      new_password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required)
    },{
      validators: PasswordChecker("new_password", "confirm_password")
    })
  }

  ngOnInit(): void {
  }

  onSubmit = () => {
      console.log("form data : ", this.changePasswordForm.value)
      const postData = {
        current_password: this.changePasswordForm.value.current_password,
        new_password: this.changePasswordForm.value.new_password
      }

      this.authService.changePassword(postData).subscribe(data => {
        console.log('success');
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Password updated successfully.'});
        this.ref.close();
      }, error => {
        console.log("error ");
        this.messageService.add({severity: 'error', summary: 'Failed', detail: 'Please provide proper credentials'});
      })
  }
  
  resetchangePasswordForm = () => {
      this.changePasswordForm.reset();    
  }


}
