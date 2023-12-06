import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private baseUrl = 'http://localhost:6060/api/clients';



  constructor(private http: HttpClient) { }

  getClients(page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get(`${this.baseUrl}`, { params });
  }

  getClientsByType(type: number, page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get(`${this.baseUrl}/type/${type}`, { params });
  }

  getClientsResidential( page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get(`${this.baseUrl}/type/residential`, { params });
  }

  getClientsAffaire( page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get(`${this.baseUrl}/type/affaire`, { params });
  }
}
