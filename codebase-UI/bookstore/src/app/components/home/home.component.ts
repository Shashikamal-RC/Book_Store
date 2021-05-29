import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private bookService: BookService
  ) { }

  products: any[] = [];
  sortOptions: any[] = [];
  sortOrder: number = 0;
  sortField: string = '';
  books: any;
  booksData: any[] = [];

  sortKey: any;
  searchText: string = "";

  ngOnInit(): void {
    this.sortOptions = [
        {label: 'Price High to Low', value: '!price'},
        {label: 'Price Low to High', value: 'price'}
    ];

    this.bookService.fetchBooks().subscribe(data => {
      console.log("books", data)
      this.books = data;
      this.booksData = this.books.results;
    }, error => {
      console.log("error in fetching books")
    })
    
    this.products.push(
      {
        name: "items",
        description: 'desc',
        rating: 4,
        category: "dsdfsd",
        price: 1199,
        inventoryStatus: 'OUTOFSTOCK'
      },
      {
        name: "items",
        description: 'desc',
        rating: 4,
        category: "dsdfsd",
        price: 1099,
        inventoryStatus: 'OUTOFSTOCK'
      },
      {
        name: "items",
        description: 'desc',
        rating: 4,
        category: "dsdfsd",
        price: 1999,
        inventoryStatus: 'OUTOFSTOCK'
      }
    )
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
