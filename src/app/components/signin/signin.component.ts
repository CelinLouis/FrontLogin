import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthentificatedService } from 'src/app/services/authentificated.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ConfirmerComponent } from '../confirmer/confirmer.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  /* form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    body: new FormControl('', Validators.required)
  });
   
  get f(){
    return this.form.controls;
  } */

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.maxLength(8)]);
  usernameFormControl = new FormControl('', [Validators.required, Validators.maxLength(8)]);

  checked = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  user: User = {
    id:0,
    email: '',
    password : '',
    username : '',
    first_name: '',
    last_name: '',
  }
  loading = false;
  durationInSeconds = 5;

  constructor(private service: AuthentificatedService, private router: Router,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  /**
   * sign_in
   */
  signin(): void {
    this.loading = true;
     const data = {
      'email': this.user.email,
      'password': this.user.password,
      'username': this.user.username
    }
    this.service.signin(data)
    .subscribe(
      (response) => {
        this._snackBar.openFromComponent(ConfirmerComponent, {
          duration: this.durationInSeconds * 1000,
          horizontalPosition: 'center'
        });
        console.log(response);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      },
      error =>{
        console.log(error);
      });
  }
 
}
