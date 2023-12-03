import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardClientsResidentielsComponent } from './board-clients-residentiels/board-clients-residentiels.component';
import { BoardUtilisateursComponent } from './board-utilisateurs/board-utilisateurs.component';
import { BoardClientsAffairesComponent } from './board-clients-affaires/board-clients-affaires.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  { path: 'tableau-de-bord', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'clients-affaires', component: BoardClientsAffairesComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'clients-residentiels', component: BoardClientsResidentielsComponent },
  { path: 'utilisateurs', component: BoardUtilisateursComponent },

  { path: 'administration', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
