import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { BoardClientsAffairesComponent } from './board-clients-affaires/board-clients-affaires.component';
import { BoardClientsResidentielsComponent } from './board-clients-residentiels/board-clients-residentiels.component';
import { BoardUtilisateursComponent } from './board-utilisateurs/board-utilisateurs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { CreateUserDialogComponent } from './board-utilisateurs/CreateUserDialog/CreateUserDialog.component';
import { NoAccessComponent } from './noAccess/noAccess.component';
import { UpdateUserRolesDialogComponent } from './board-utilisateurs/UpdateUserRolesDialog/UpdateUserRolesDialog.component';
import { UpdatePasswordDialogComponent } from './board-utilisateurs/UpdatePasswordDialog/UpdatePasswordDialog.component';


@NgModule({
  declarations: [					
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,

      BoardClientsAffairesComponent,
      BoardClientsResidentielsComponent,
      BoardUtilisateursComponent,
      CreateUserDialogComponent,
      NoAccessComponent,
      UpdateUserRolesDialogComponent,
      UpdatePasswordDialogComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
