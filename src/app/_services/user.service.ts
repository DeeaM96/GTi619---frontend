import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:5050/api/test/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getCientsAffairesBoard(): Observable<any> {
    return this.http.get(API_URL + 'prep_aff', { responseType: 'text' });
  }


  getCientsResidentielsBoard(): Observable<any> {
    return this.http.get(API_URL + 'prep_res', { responseType: 'text' });
  }

  getUtilisateursBoard(): Observable<any> {
    return this.http.get(API_URL + 'utilisateurs', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}