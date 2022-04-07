import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { AuthHeaderService } from './auth-header.service';

const baseUrl = 'http://127.0.0.1:8000/profil/';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  user: any=[];

  constructor(private httpClient: HttpClient,private service: AuthHeaderService, private router: Router) { }

  getProfil(){
    return new Observable<any>((observer)=>{
      if(this.user) {
        observer.next(this.user);
        observer.complete();
      }else {
        this.httpClient.get(baseUrl, {headers: this.service.headers()}).subscribe(
          users => {
            this.user = users;
            observer.next(users);
            observer.complete();
          },
          error =>{
            observer.error(error);
            observer.complete();
          }
        )
      }
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable <boolean>{
    return new Observable<any>((observer)=>{
        this.getProfil().subscribe(
        user => {
            observer.next(true);
            observer.complete();
          },
          error =>{
            this.router.navigate(['']);
            observer.next(false);
            observer.complete();
          }
        )
    })
    
  }

}
