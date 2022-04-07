import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthHeaderService {

  constructor(private cookieService: CookieService) { }

  httpHeaders : any = { 'Content-Type' : 'application/json' };
  
  getToken(){
    return localStorage.getItem('currentUser');
  }


  headers(){
     const token = this.getToken();

     if (token !== '') {
       this.httpHeaders['Authorization'] = 'Token ' + token;
     }
     return new HttpHeaders(this.httpHeaders);
  }

  isAuthentificated(){
    const token = this.getToken();
    return token === '' ? false : true;
  }

}
