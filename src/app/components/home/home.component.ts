import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificatedService } from 'src/app/services/authentificated.service';
import {MatDialog} from '@angular/material/dialog';
import { ProfilComponent } from '../profil/profil.component';
import { AlerteComponent } from '../alerte/alerte.component';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  data: any=[];

  constructor(private service: AuthentificatedService, private router: Router,public dialog: MatDialog) { }

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

  openDialog() {
    const dialogRef = this.dialog.open(ProfilComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAlert() {
    this.dialog.open(AlerteComponent);
  }

}

