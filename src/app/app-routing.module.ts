import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProfilComponent } from './components/profil/profil.component';
import { ConfirmerComponent } from './components/confirmer/confirmer.component';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'login'},
  {path: 'login', component: LoginComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  {path: 'profil', component: ProfilComponent},
  {path: 'welcome', component: ConfirmerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
