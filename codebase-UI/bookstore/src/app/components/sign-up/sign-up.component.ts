import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { PasswordChecker } from 'src/app/custom-validators/password-match';
import { AuthService } from 'src/app/services/auth.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private ref: DynamicDialogRef,
    private messageService: MessageService
  ) {
    this.signUpForm = this.formBuilder.group({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone_number: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required)
    }, {
      validators: PasswordChecker("password", "confirm_password")
    })
  }

  ngOnInit(): void {
  }

  onSubmit = () => {
      const postData = {
        first_name: this.signUpForm.value.first_name,
        last_name: this.signUpForm.value.last_name,
        username: this.signUpForm.value.username,
        email: this.signUpForm.value.email,
        phone_number: this.signUpForm.value.phone_number,
        password: this.signUpForm.value.password,
      }

      this.authService.signUp(postData).subscribe(data => {
        console.log("success")
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Registration successful'});
        this.ref.close();
      }, error => {
        console.log("something went wrong")
        this.messageService.add({severity: 'error', summary: 'Failure', detail: 'Something went wrong. Please try again.'});
      })
  }
  
  resetsignUpForm = () => {
      this.signUpForm.reset();    
  }

}
