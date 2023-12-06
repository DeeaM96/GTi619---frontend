import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-UpdateUserRolesDialog',
  templateUrl: './UpdateUserRolesDialog.component.html',
  styleUrls: ['./UpdateUserRolesDialog.component.css']
})
export class UpdateUserRolesDialogComponent implements OnInit {
  availableRoles = [{name:'Administrateur', value:'admin'}, {name:'Preposé aux clients d\'affaires', value:'prep_aff'}, {name:'Preposé aux clients d\'résidentiels', value:'prep_res'}]; 
  selectedRoles: string[];
  username:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authService:AuthService,private dialogRef: MatDialogRef<UpdateUserRolesDialogComponent> ) {
    console.log("USER ROLES", data.userRoles)

    const roleMapping :any= {
      'ROLE_PREP_RES': 'prep_res',
      'ROLE_ADMIN': 'admin',
      'ROLE_PREP_AFF': 'prep_aff'
    };
  
    this.selectedRoles = data.userRoles.map((role: string) => roleMapping[role] || role);
    this.username=data.username;
  
  }

  checkRoleSelected(role:any): boolean {
    return this.selectedRoles.includes(role.value);
  }

  updateRoles(): void {
    // Logic to call service to update user roles
    console.log('Updated roles:', this.selectedRoles);

    this.authService.updateRoles(this.username, this.selectedRoles).subscribe({
      next: data => {
        console.log(data);
        this.dialogRef.close(true);
        
      
      },
      error: err => {
       console.log(err)
      }
    });
  }

  

  ngOnInit() {
  }

}
