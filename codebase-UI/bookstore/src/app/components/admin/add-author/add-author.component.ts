import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss']
})
export class AddAuthorComponent implements OnInit {
  authorForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private ref: DynamicDialogRef,
    private messageService: MessageService
  ) {
    this.authorForm = this.formBuilder.group({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      sex: new FormControl(0, Validators.required),
      dob: new FormControl(),
      photo: new FormControl()
    })
  }

  sex: any[]= [];
  formData= new FormData();

  ngOnInit(): void {
    this.sex = [
      {name: 'Male', code: 'M'},
      {name: 'Female', code: 'F'},
      {name: 'Others', code: 'O'}
    ]
  }

  onSubmit = () => {
      var dob = new Date(this.authorForm.value.dob).toISOString();

      this.formData.append('first_name', this.authorForm.value.first_name)  
      this.formData.append('last_name', this.authorForm.value.last_name)  
      this.formData.append('sex', this.authorForm.value.sex)  
      this.formData.append('dob', dob)  
    
      this.bookService.createAuthor(this.formData).subscribe(data => {
        console.log("created successfully")
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Author Created successfully'});
        this.ref.close();
      }, error => {
        console.log("something went wrong")
        this.messageService.add({severity: 'error', summary: 'Failure', detail: 'Unable to create'});
      })
  }

  imageUpload = (event: any) => {
    this.formData = new FormData();

    var file = event.files[0];
    this.formData.append('photo', file)

    this.authorForm.patchValue({
      photo: this.formData.get('photo')
    })
  }
  
  resetAuthor = () => {
      this.authorForm.reset();    
  }
}