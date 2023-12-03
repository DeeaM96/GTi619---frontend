import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { EventBusService } from '../_shared/event-bus.service';
import { EventData } from '../_shared/event.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(  private eventBusService: EventBusService,private authService: AuthService, private storageService: StorageService, private router:Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
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

        if(err.status==403 && err.error.blocked){
          this.storageService.saveUser(err.error);
          this.router.navigate(['/change-password']);
        } else {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
       
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
