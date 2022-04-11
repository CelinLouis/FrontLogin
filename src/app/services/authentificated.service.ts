import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthHeaderService } from './auth-header.service';


const baseUrl = 'http://127.0.0.1:8000';
const httpHeaders = new HttpHeaders({
  "Content-type": "Application/json",
});


@Injectable({
  providedIn: 'root'
})
export class AuthentificatedService {

  constructor(private http: HttpClient, private autheard: AuthHeaderService) { }

  signin(data: any): Observable<any> {
    return this.http.post(baseUrl + '/signin/', data,
    {headers: httpHeaders});
  } 

  login(data: any): Observable<any>  {
    return this.http.post<any>(baseUrl + '/login/', data,
    {headers: httpHeaders}).pipe(
      map(user => {
        if (user && user.token) {
          localStorage.setItem("currentUser", user.token)
        }
        return user;
      })
    )
    ;
  }

  logout(data: any): Observable<any>{
    return this.http.post<any>(baseUrl + '/logout/',data,
    {headers: this.autheard.headers()});
  }



  profil(): Observable<any> {
    return this.http.get(baseUrl + '/profil/',
    {headers: this.autheard.headers()});
  } 

  update(data: any): Observable<any> {
    return this.http.put(baseUrl + '/profil/',data,
    {headers: this.autheard.headers()});
  }

  delete(): Observable<any> {
    return this.http.delete(baseUrl + '/profil/',
    {headers: this.autheard.headers()});
  }

}
