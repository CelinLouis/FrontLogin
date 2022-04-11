import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthentificatedService } from 'src/app/services/authentificated.service';
import { Router } from '@angular/router';

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


  constructor(private service: AuthentificatedService, private router: Router) { }

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
        console.log(response);
        setTimeout(() => {
          this.router.navigate(['home/']);
        }, 3000);
      },
      error =>{
        console.log(error);
      });
  }
 
}
