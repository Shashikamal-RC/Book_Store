import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-add-publisher',
  templateUrl: './add-publisher.component.html',
  styleUrls: ['./add-publisher.component.scss']
})
export class AddPublisherComponent implements OnInit {
  publisherForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private ref: DynamicDialogRef,
    private messageService: MessageService
  ) {
    this.publisherForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      phone_number: new FormControl('', Validators.required),
      street_address: new FormControl(0, Validators.required),
      address_line_2: new FormControl(),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zip_code: new FormControl(0, Validators.required)
    })
  }

  ngOnInit(): void {
  }

  onSubmit = () => {
    const postData = {
      name: this.publisherForm.value.name,
      phone_number: this.publisherForm.value.phone_number,
      address: {
        street_address: this.publisherForm.value.street_address,
        address_line_2: this.publisherForm.value.address_line_2,
        city: this.publisherForm.value.city,
        state: this.publisherForm.value.state,
        zip_code: this.publisherForm.value.zip_code,
      }
    }
    console.log("form data : ", postData)
    this.bookService.createPublisher(postData).subscribe(data => {
      console.log("created ")
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Author Created successfully'});
      this.ref.close();
    }, error => {
      console.log("something went wrong")
      this.messageService.add({severity: 'error', summary: 'Failure', detail: 'Unable to create'});
    })
  }

  resetPublisher = () => {
    this.publisherForm.reset();
  }
}
