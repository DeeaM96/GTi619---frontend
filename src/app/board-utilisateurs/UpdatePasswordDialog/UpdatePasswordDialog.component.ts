import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-UpdatePasswordDialog',
  templateUrl: './UpdatePasswordDialog.component.html',
  styleUrls: ['./UpdatePasswordDialog.component.css']
})
export class UpdatePasswordDialogComponent implements OnInit {

  user: any;
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  errorMessage:string='';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private authService: AuthService,
    private dialogRef: MatDialogRef<UpdatePasswordDialogComponent>
  ) {
    console.log("USER", data.user);
    this.user = data.user;
  }

  ngOnInit() {
  }

  onUpdatePassword() {
    if (this.newPassword !== this.confirmNewPassword) {
      // Handle password mismatch
      console.error("Passwords do not match!");
      this.errorMessage="Passwords do not match!";
      return;
    }

    // Call AuthService to update the password
    this.authService.updatePassword(this.user.id,  this.newPassword)
      .subscribe(
        success => {
          // Handle success
          console.log("Password updated successfully");
          this.dialogRef.close();
        },
        error => {
          // Handle error
          console.error("Error updating password", error);
          this.errorMessage=error.error.message || error.error;
        }
      );
  }

  onCancel() {
    this.dialogRef.close();
  }
}
