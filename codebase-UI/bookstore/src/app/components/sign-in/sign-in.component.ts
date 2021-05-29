import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private ref: DynamicDialogRef,
    private messageService: MessageService
  ) {
    this.signInForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  onSubmit = () => {
      console.log("form data : ", this.signInForm.value)
      this.authService.signIn(this.signInForm.value).subscribe(data => {
        console.log("sign in successful");
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Sign in success'});
        this.ref.close();
      }, error => {
        console.log("something went wrong!", error.detail);
        this.messageService.add({severity: 'error', summary: 'Failure', detail: 'Invalid credentials'});
      })
  }
  
  resetsignInForm = () => {
      this.signInForm.reset();    
  }

}
