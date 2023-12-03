import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ClientsService } from '../_services/clients.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-board-clients-affaires',
  templateUrl: './board-clients-affaires.component.html',
  styleUrls: ['./board-clients-affaires.component.css']
})
export class BoardClientsAffairesComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'prenom', 'type']; 

  content?: string;
  permission=true;

  totalElements: number = 0;
  size: number = 10;
  page: number = 0;
  clients: any;

  constructor(private userService: UserService,private clientsService: ClientsService) { }

  ngOnInit(): void {
   this.getClients();
  }

  getClients(){
    this.clientsService.getClientsAffaire(this.page, this.size).subscribe({
      next: data => {
        this.clients = data.content;
        this.totalElements = data.totalElements;
     
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

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.getClients();
  }

}
