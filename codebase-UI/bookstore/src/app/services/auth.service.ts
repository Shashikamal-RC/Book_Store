import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { User } from './auth.model';

import { SIGNIN, SIGNUP, authResponseData } from './auth'
import { BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import jwt_decode, { JwtPayload } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(new User("", 0))
  private tokenExpirationTimer : any;

  isAuthenticated = new BehaviorSubject<boolean>(false)

  getAuthentication = () => {
    return this.isAuthenticated.asObservable();
  }

  setAuthentication = (status: boolean) => {
    if(status){
      localStorage.setItem("isAuthenticated", JSON.stringify(status));
    }else{
      localStorage.removeItem("isAuthenticated");
    }
    return this.isAuthenticated.next(status);
  }

  userInfo = () => {
    return this.user.asObservable();
  }

  constructor(
    private http : HttpClient,
    private router : Router
  ) { }

  signIn(data: SIGNIN){
    return this.http
      .post<authResponseData>(
            environment.apiUrl + "/auth/login",
            data
      )
      .pipe(
        catchError(this.handleError), 
        tap(resData => {
          this.handleAuthentication(resData)
        })
      )
  }

  signUp(data: SIGNUP){
    return this.http
        .post<authResponseData>(
            environment.apiUrl + "/auth/register",
            data
        )
        .pipe(
          catchError(this.handleError),
          tap(resData => {
            this.handleAuthentication(resData)
          })
        )
  }

  changePassword = (data: any) => {
    return this.http.put(environment.apiUrl + "/auth/change_password", data);
  }


  getTokenExpirationTime(token : string){
    let _tokenExpirationTime : JwtPayload = jwt_decode(token)
    let exp = _tokenExpirationTime.exp ? _tokenExpirationTime.exp * 1000 : 0
    return exp;
  }

  logout(){
    this.user.next(new User("", 0));
    this.http.get(environment.apiUrl + "/auth/logout");
    this.router.navigate(['/home']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.setAuthentication(false);
  }

  private handleAuthentication (token : any){
    const userData = new User(token, this.getTokenExpirationTime(token.access));
    this.user.next(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
    this.setAuthentication(true);
  }

  private handleError (errorResponse : HttpErrorResponse){
    console.log("error : ", errorResponse)
    // assign which ever error message you want to send based on conditions
    let errorMessage = errorResponse.error
    return throwError(errorMessage)
  }

  fetchUserProfile = (user_id: any) => {
    return this.http.get(environment.apiUrl + "/userprofile/" + user_id )
  }

  patchUserProfile = (user_id: any, userData: any) => {
    return this.http.patch(environment.apiUrl + "/userprofile/" + user_id + "/", userData );
  }

  updateAddress = (user_id: any, address_id: any, address: any) => {
    return this.http.patch(environment.apiUrl + "/user/" + user_id + "/address/" + address_id + "/", address);
  }

  confirmOrder = (user_id: any, orderData: any) => {
    return this.http.post(environment.apiUrl + "/user/" + user_id + "/order/" , orderData)
  }

}
