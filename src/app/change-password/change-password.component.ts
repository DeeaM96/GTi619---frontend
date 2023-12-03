import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { EventBusService } from '../_shared/event-bus.service';
import { EventData } from '../_shared/event.class';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user: any;
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  errorMessage:string='';

  isLoggedIn = false;
  isLoginFailed = false;

  roles: string[] = [];

  constructor(
    private eventBusService: EventBusService,
    private authService: AuthService,private storageService: StorageService, private router:Router
 
  ) {
   
  }

  ngOnInit() {
    this.user = this.storageService.getUser();
  }

  onUpdatePassword() {
    if (this.newPassword !== this.confirmNewPassword) {
      // Handle password mismatch
      console.error("Passwords do not match!");
      this.errorMessage="Passwords do not match!";
      return;
    }

    // Call AuthService to update the password
    this.authService.updatePassword(this.user.id,  this.newPassword,false)
      .subscribe(
        success => {
          // Handle success
          console.log("Password updated successfully");
          this.authService.login(this.user.username, this.newPassword).subscribe({
            next: data => {
            
              this.storageService.saveUser(data);
              this.eventBusService.emit(new EventData('login',null), data); // Emitting login event

              this.isLoginFailed = false;
              this.isLoggedIn = true;
              this.roles = this.storageService.getUser().roles;
              
              this.router.navigate(['/tableau-de-bord']);
           
            },
            error: err => {
              debugger;
              this.errorMessage = err.error.message;

            }
          });
        },
        error => {
          // Handle error
          console.error("Error updating password", error);
          this.errorMessage=error.error.message;
        }
      );
  }



}
