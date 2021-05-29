import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private bookService: BookService,
    private cartService: CartService,
    private messageService: MessageService
  ) { }

  products: any[] = [];
  sortOptions: any[] = [];
  sortOrder: number = 0;
  sortField: string = '';
  books: any;
  booksData: any[] = [];

  sortKey: any;
  searchText: string = "";
  cart : any = [];

  ngOnInit(): void {
    this.sortOptions = [
        {label: 'Price High to Low', value: '!price'},
        {label: 'Price Low to High', value: 'price'}
    ];

    this.fetchBooks();
  }

  fetchBooks = () => {
    this.bookService.fetchBooks().subscribe(data => {
      console.log("books", data)
      this.books = data;
      this.booksData = this.books.results;
    }, error => {
      console.log("error in fetching books")
    })
  }

  addToCart = (product: any) => {
    let exists = false;

    if(localStorage.getItem('bookcart')){
      this.cart = JSON.parse(localStorage.getItem("bookcart") || '{}');
    }

    for( let i=0;i<this.cart.length; i++){
      if(this.cart[i].id === product.id){
          this.cart[i].count = this.cart[i].count + 1
          exists = true
          break;
      }
    }
    if(!exists){
        product['count'] = 1;
        this.cart.push(product);
    }
    localStorage.setItem("bookcart", JSON.stringify(this.cart))

    this.cartService.addToCart(true);
    this.messageService.add({severity: 'success', summary: 'Success', detail: `Added ${product?.title} to cart`});
  }

  onSortChange(event: any) {
      let value = event.value;

      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
      }
      else {
          this.sortOrder = 1;
          this.sortField = value;
      }
  }

}
