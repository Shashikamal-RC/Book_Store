import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http : HttpClient,
  ) { }

  baseURL: string = environment.apiUrl;

  // books operations
  fetchBooks = () => {
    return this.http.get(this.baseURL + '/books/');
  }

  createBook = (book: any) => {
    return this.http.post(this.baseURL + '/books/', book);
  }

  fetchBook = (book_id: any) => {
    return this.http.get(this.baseURL + "/books/" + book_id);
  }

  updateBook = (book_id:any, book:any) => {
    return this.http.patch(this.baseURL + '/books/' + book_id + "/", book);
  }

  deleteBook = (book_id:any) => {
    this.http.delete(this.baseURL + '/books/' + book_id);
  }

  // author operations
  fetchAuthors = () => {
    return this.http.get(this.baseURL + '/author/');
  }

  createAuthor = (author: any) => {
    const req = new HttpRequest('POST', this.baseURL + '/author/', author,  {
      reportProgress: true, responseType: 'json'
    });

    return this.http.request(req);
    // return this.http.post(this.baseURL + '/author/', author);
  }

  fetchAuthor = (book_id: any) => {
    return this.http.get(this.baseURL + "/author/" + book_id);
  }

  updateAuthor = (book_id:any, author:any) => {
    return this.http.put(this.baseURL + '/author/' + book_id, author);
  }

  deleteAuthor = (book_id:any) => {
    this.http.delete(this.baseURL + '/author/' + book_id);
  }

  // pulisher operations
  fetchPublishers = () => {
    return this.http.get(this.baseURL + '/publisher/');
  }

  createPublisher = (publisher: any) => {
    return this.http.post(this.baseURL + '/publisher/', publisher);
  }

  fetchPublisher = (book_id: any) => {
    return this.http.get(this.baseURL + "/publisher/" + book_id);
  }

  updatePublishers = (book_id:any, publisher:any) => {
    return this.http.put(this.baseURL + '/publisher/' + book_id, publisher);
  }

  deletePublishers = (book_id:any) => {
    this.http.delete(this.baseURL + '/publisher/' + book_id);
  }

}
