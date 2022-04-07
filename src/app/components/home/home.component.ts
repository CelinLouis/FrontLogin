import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificatedService } from 'src/app/services/authentificated.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  data: any=[];

  constructor(private service: AuthentificatedService, private router: Router) { }

  ngOnInit(): void {
    this.getProfil();
  }

  public getProfil(){
    this.service.profil().subscribe(
      response => {
        this.data= response;
        console.log(response);
      },
        error =>{
          console.log(error);
      });
  }

  logout(): void {
    this.service.logout(null).subscribe(
      response => {
        console.log(response);
        localStorage.removeItem('currentUser');
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      },
      error=>{
        console.log(error);
      }
    )
  }

}
