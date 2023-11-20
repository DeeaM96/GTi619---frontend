import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-clients-affaires',
  templateUrl: './board-clients-affaires.component.html',
  styleUrls: ['./board-clients-affaires.component.css']
})
export class BoardClientsAffairesComponent implements OnInit {

  content?: string;
  permission=true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCientsAffairesBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
       this. permission=false;
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
