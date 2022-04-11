import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificatedService } from 'src/app/services/authentificated.service';
import {MatDialog} from '@angular/material/dialog';
import { ProfilComponent } from '../profil/profil.component';
import { AlerteComponent } from '../alerte/alerte.component';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { User } from 'src/app/models/user.model';

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
  dataList: any;
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  data: any=[];
  loading = false;

  user: User = {
    id:0,
    email: '',
    password : '',
    username : '',
    first_name: '',
    last_name: '',
  }

  constructor(private service: AuthentificatedService, private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProfil();
  }

  public getProfil(){
    this.service.profil().subscribe(
      response => {
       /*  this.data= response; */
        this.user= response;
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


  delete(): void {
    this.service.delete().subscribe(
      response => {
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
    let dialogRef = this.dialog.open(AlerteComponent);
    dialogRef.componentInstance.user = this.data;
    /* dialogRef.afterClosed().subscribe(
      response => {
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      }
    ) */
  }

  save(): void {
    this.loading = true;
    const updateData = {
      'id': this.user.id,
      'email': this.user.email,
      'username': this.user.username,
      'first_name': this.user.first_name,
      'last_name': this.user.last_name,
    }
     this.service.update(updateData).subscribe(
       response => {
          console.log(response);
          setTimeout(() => {
            this.loading = false;
            this.getProfil();
          }, 3000);
       },
       error =>{
         console.log(error);
       }
     )
  }


/*  */

/*   loadItems() {
    this.dataList = [];
    // mock server request
    setTimeout(() => {
      this.dataList = [{
        id: 1,
        title: 'qui dignissimos debitis',
        body: 'Ut perferendis delectus que error vel nemo. Quam deserunt.'
      }, {
        id: 2,
        title: 'numquam voluptas culpa',
        body: ' Porro sed consequuntur porro ipsum harum. Dignissimos qui officiis.'
      }, {
        id: 3,
        title: 'repudiandae molestiae illum',
        body: 'Vel eveniet accusamus reprehenderit dolor. Vel qui porro ex quidem.'
      }, {
        id: 4,
        title: 'nobis id repellat',
        body: 'Quam itaque recusandae. Autem nostrum aut nemo alias eos dicta autem .'
      }, {
        id: 5,
        title: 'assumenda voluptates voluptatibus',
        body: 'Omnis exercitationem est facilis minima molestiae laudantium.'
      }];
    }, 2000);
  }

  // Generate Fake Object Array
  generateFake(count: number): Array<number> {
    const indexes = [];
    for (let i = 0; i < count; i++) {
      indexes.push(i);
    }
    return indexes;
  } */

}

