import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthentificatedService } from 'src/app/services/authentificated.service';

@Component({
  selector: 'app-alerte',
  templateUrl: './alerte.component.html',
  styleUrls: ['./alerte.component.css']
})
export class AlerteComponent implements OnInit {

  user: any;

  constructor(public matdialogRef: MatDialogRef<AlerteComponent>,private service: AuthentificatedService, private router: Router) { }

  ngOnInit(): void {
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

}
