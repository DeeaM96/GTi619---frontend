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
      // Gérer la non-concordance des mots de passe
      console.error("Les mots de passe ne correspondent pas!");
      this.errorMessage="Les mots de passe ne correspondent pas";
      return;
    }

    // Call AuthService to update the password
    this.authService.updatePassword(this.user.id,  this.newPassword)
      .subscribe(
        success => {
          // Handle success
          console.log("Mot de passe mit à jour avec succès");
          this.dialogRef.close();
        },
        error => {
          // Handle error
          console.error("Erreur lors de la mise à jour du mot de passe", error);
          this.errorMessage=error.error.message || error.error;
        }
      );
  }

  onCancel() {
    this.dialogRef.close();
  }
}
