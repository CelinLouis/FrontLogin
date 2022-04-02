import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthentificatedService } from 'src/app/services/authentificated.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
    username : ''
  }



  constructor(private service: AuthentificatedService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
     const data = {
      //'email': this.user.email,
      'password': this.user.password,
      'username': this.user.username,
    }
    this.service.login(data).subscribe(
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
