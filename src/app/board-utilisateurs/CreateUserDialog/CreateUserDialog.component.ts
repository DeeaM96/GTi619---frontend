import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-CreateUserDialog',
  templateUrl: './CreateUserDialog.component.html',
  styleUrls: ['./CreateUserDialog.component.css']
})
export class CreateUserDialogComponent implements OnInit {
  passwordMismatch = false;
  errorMessage='';
  
  constructor(private authService:AuthService,  private dialogRef: MatDialogRef<CreateUserDialogComponent> // Inject the MatDialogRef
  ) { }

  ngOnInit() {
  }

  userData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: []
  };

  availableRoles = [{name:'Administrateur', value:'admin'}, {name:'Preposé aux clients d\'affaires', value:'prep_aff'}, {name:'Preposé aux clients d\'résidentiels', value:'prep_res'}]; 

  createUser(): void {
    if (!this.passwordMismatch) {
      console.log(this.userData);

      this.authService.createUser(this.userData.username, this.userData.email, this.userData.password, this.userData.role).subscribe({
        next: data => {
          console.log(data);
          this.dialogRef.close(true);
          
        
        },
        error: err => {
         console.log(err)
         this.errorMessage=err.error.message;
        }
      });
    
      // proceed with form submission
    } else {
      this.errorMessage="Passwords do not match!";
    }
  }

  checkPasswords(): void {
    // Use this method to compare the password and confirm password
    this.passwordMismatch = this.userData.password !== this.userData.confirmPassword;
  }
}
