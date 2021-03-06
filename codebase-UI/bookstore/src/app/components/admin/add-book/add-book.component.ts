import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AddAuthorComponent } from '../add-author/add-author.component';
import { AddPublisherComponent } from '../add-publisher/add-publisher.component';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  bookForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private messageService: MessageService,
    private bookService: BookService,
    private activatedRoute: ActivatedRoute
  ) {
    this.bookForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      ISBN: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.required),
      authors: new FormControl([], Validators.required),
      image: new FormControl('', Validators.required),
      publisher: new FormControl('', Validators.required),
      stock: new FormControl(0, Validators.required)
    })
  }

  authors: any;
  authorList: any[] = [];
  publishers: any;
  publishersList: any[] = [];
  formData= new FormData();
  book_id: any;
  imageUrl: any;
  editData: any;

  ngOnInit(): void {
    this.book_id = this.activatedRoute.snapshot.paramMap.get('book_id')
    console.log("book id ", this.book_id)

    if(this.book_id){
      this.bookService.fetchBook(this.book_id).subscribe(data => {
        console.log("data : ", data)
        this.setFormData(data);
        this.editData = data;
        this.imageUrl = this.editData.image;
      }, error => {
        console.log("error fetching data ")
      })
    }
    this.fetchPublishersList();
    this.fetchAuthorsList();
  }

  fetchAuthorsList = () => {
    this.bookService.fetchAuthors().subscribe(data => {
      this.authors = data;
      this.authors = this.authors.results;

      this.authors.map((item: any ) => {
        this.authorList.push({ name: item.first_name + " " + item.last_name, code: item.id })
      })
      console.log("authors : ", this.authors)      
    }, error => {
      console.log("error fetching authors")
    })
  }


  setFormData = (data: any) => {
    this.bookForm.reset({
      title: data.title,
      ISBN: data.ISBN,
      stock: data.stock,
      price: data.price,
      publisher: data.publisher.id,
      image: data.image,
      authors: data.authors.map((item:any) => {return item.id})
    })
  }

  fetchPublishersList = () => {
    this.bookService.fetchPublishers().subscribe(data => {
      this.publishers = data;
      this.publishers = this.publishers.results;

      this.publishers.map((item: any ) => {
        this.publishersList.push({ name: item.name, code: item.id })
      })
      console.log("authors : ", this.authors)      
    }, error => {
      console.log("error fetching authors")
    })
  }

  onSubmit = () => {
    this.bookForm.value.authors.map((item: any) => {
      this.formData.append('authors', item)
    })
    this.formData.append('title', this.bookForm.value.title)  
    this.formData.append('ISBN', this.bookForm.value.ISBN)  
    this.formData.append('price', this.bookForm.value.price)
    this.formData.append('publisher', this.bookForm.value.publisher)  
    this.formData.append('stock', this.bookForm.value.stock)  
    
    console.log("data : ", this.formData.get('image'), this.formData.getAll("title"));

    if(this.book_id){
      this.updateBook()
    }else{
      this.createBook()
    }

  }

  updateBook = () => {
    console.log("update data : ", this.formData)

    this.bookService.updateBook(this.book_id, this.formData).subscribe(data => {
      console.log("updated successfully")
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Author updated successfully'});
    }, error => {
      console.log("something went wrong")
      this.messageService.add({severity: 'error', summary: 'Failure', detail: 'Unable to update'});
    })
  }

  createBook = () => {
    this.bookService.createBook(this.formData).subscribe(data => {
      console.log("created successfully")
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Author Created successfully'});
    }, error => {
      console.log("something went wrong")
      this.messageService.add({severity: 'error', summary: 'Failure', detail: 'Unable to create'});
    })
  }


  imageUpload = (event: any) => {
    this.imageUrl = null;
    this.formData = new FormData();
    var file = event.files[0];
    this.formData.append('image', file)

    this.bookForm.patchValue({
      image: this.formData.get('image')
    })
  }

  resetBook = () => {
    this.bookForm.reset();
  }

  addNewAuthor = () => {
    const ref = this.dialogService.open(AddAuthorComponent, {
      data: "",
      header: "Add Author details",
      width: '70%'
    })

    ref.onClose.subscribe((data: any) => {
      this.fetchAuthorsList();
      this.messageService.add({severity: 'success', summary: '', detail: ''});
    })
  }

  addNewPublisher = () => {
    const ref = this.dialogService.open(AddPublisherComponent, {
      data: "",
      header: "Add Publisher details",
      width: '70%'
    })

    ref.onClose.subscribe((data: any) => {
      this.fetchPublishersList();
      this.messageService.add({severity: 'success', summary: '', detail: ''});
    })
  }

}
