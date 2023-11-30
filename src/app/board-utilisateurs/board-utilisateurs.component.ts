import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_common/user';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserDialogComponent } from './CreateUserDialog/CreateUserDialog.component';
import { UpdateUserRolesDialogComponent } from './UpdateUserRolesDialog/UpdateUserRolesDialog.component';
import { UpdatePasswordDialogComponent } from './UpdatePasswordDialog/UpdatePasswordDialog.component';


@Component({
  selector: 'app-board-utilisateurs',
  templateUrl: './board-utilisateurs.component.html',
  styleUrls: ['./board-utilisateurs.component.css']
})
export class BoardUtilisateursComponent implements OnInit {

  content?: string;
  dataSource: User[] = [];  // 

  permission=true;

  displayedColumns: string[] = ['id', 'username', 'email', 'actions']; 

  constructor(private userService: UserService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getUtilisateursBoard().subscribe({
      next: data => {
        
        this.dataSource = data;
        this.permission=true;
      },
      error: err => {
        this.permission=false;
      
      }
    });

   
  }

  addRole(user: User): void {
    const dialogRef = this.dialog.open(UpdateUserRolesDialogComponent, {
      width: '500px',
      data: { userRoles: user.roles, username:user.username } // Pass the current roles of the user
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);
        this.reloadUserList();
        // Call service to update user roles
      }
    });
  }

  createUser(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        // If the result is true, user was created successfully
        this.reloadUserList();
      }
    });
  }

  reloadUserList(): void {
    this.userService.getUtilisateursBoard().subscribe({
      next: data => {
        this.dataSource = data;
       
      },
      error: err => {
        console.error('Error reloading users', err);
      }
    });
  }

  modifyPassword(user: User) {
    const dialogRef = this.dialog.open(UpdatePasswordDialogComponent, {
      width: '300px',
      data: { user: user } // Pass the current roles of the user
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);
        this.reloadUserList();
        // Call service to update user roles
      }
    });
  }
}
