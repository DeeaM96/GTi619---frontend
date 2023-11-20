import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-clients-residentiels',
  templateUrl: './board-clients-residentiels.component.html',
  styleUrls: ['./board-clients-residentiels.component.css']
})
export class BoardClientsResidentielsComponent implements OnInit {

  permission=true;
  content?: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCientsResidentielsBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.permission=false;
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
  }

}
