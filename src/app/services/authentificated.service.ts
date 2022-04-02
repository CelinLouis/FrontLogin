import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map, Observable } from 'rxjs';


const baseUrl = 'http://127.0.0.1:8000';
const httpHeaders = new HttpHeaders({
  "Content-type": "Application/json",
});


@Injectable({
  providedIn: 'root'
})
export class AuthentificatedService {

  constructor(private http: HttpClient) { }

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

}
