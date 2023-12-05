import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { EventBusService } from './_shared/event-bus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showPrepAff=false;
  showPrepRes=false;
  showModeratorBoard = false;
  username?: string;

  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      this.updateUserState();
    } else {
      this.router.navigate(['/login']);
    }
  
    this.eventBusSub = this.eventBusService.on('login',() => {
      this.isLoggedIn = true;
      this.updateUserState();
    });

    // if (this.isLoggedIn) {
    //   const user = this.storageService.getUser();
    //   this.roles = user.roles;

    //   this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    //   this.showPrepAff = this.roles.includes('ROLE_PREP_AFF') ||   this.roles.includes('ROLE_ADMIN');
    //   this.showPrepRes = this.roles.includes('ROLE_PREP_RES') ||   this.roles.includes('ROLE_ADMIN');


    //   this.username = user.username;
    // }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  updateUserState(): void {
    const user = this.storageService.getUser();
    this.roles = user.roles;
  
    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    this.showPrepAff = this.roles.includes('ROLE_PREP_AFF') || this.roles.includes('ROLE_ADMIN');
    this.showPrepRes = this.roles.includes('ROLE_PREP_RES') || this.roles.includes('ROLE_ADMIN');
    this.username = user.username;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.eventBusSub) {
      this.eventBusSub.unsubscribe();
    }
  }
}
