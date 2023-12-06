import { Component } from "@angular/core";
import { Subscription, interval } from "rxjs";
import { StorageService } from "./_services/storage.service";
import { AuthService } from "./_services/auth.service";
import { EventBusService } from "./_shared/event-bus.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showPrepAff = false;
  showPrepRes = false;
  showModeratorBoard = false;
  username?: string;

  eventBusSub?: Subscription;

  private readonly checkInterval = 5 * 1000; // 10 minutes in milliseconds
  isValid!: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      this.updateUserState();
      this.startSubscriptionCheck();
    } else {
      this.router.navigate(["/login"]);
    }

    this.eventBusSub = this.eventBusService.on("login", () => {
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

    this.eventBusSub = this.eventBusService.on("logout", () => {
      this.logout();
    });
  }

  private startSubscriptionCheck() {
    debugger;
    if (this.storageService.isLoggedIn()) {
      debugger;
      const user = this.storageService.getUser();
      if (!user) {
        console.error("Invalid user object or missing customerId");
        return;
      }

      this.isValid = interval(this.checkInterval).subscribe(async () => {
        try {
          await this.authService.checkValidUser().subscribe({
            next: (response: any) => {
              if (response.blocked) {
                this.logout();
              }
            },
            error: (err) => {
              console.error("Error checking valid:", err);
            },
          });
        } catch (error) {
          console.error("Error during valid check:", error);
        }
      });
    } else {
      console.log("User not authenticated, skipping valid check");
    }
  }

  updateUserState(): void {
    const user = this.storageService.getUser();
    this.roles = user.roles;

    this.showAdminBoard = this.roles.includes("ROLE_ADMIN");
    this.showPrepAff =
      this.roles.includes("ROLE_PREP_AFF") || this.roles.includes("ROLE_ADMIN");
    this.showPrepRes =
      this.roles.includes("ROLE_PREP_RES") || this.roles.includes("ROLE_ADMIN");
    this.username = user.username;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.eventBusSub) {
      this.eventBusSub.unsubscribe();
    }
  }
}
