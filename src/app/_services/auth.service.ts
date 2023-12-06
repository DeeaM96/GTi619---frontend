import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:5050/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }

  createUser(username: string, email: string, password: string, role:string[]): Observable<any> {
    return this.http.post(
      AUTH_API + 'createUser',
      {
        username,
        email,
        password,
        role
        
      },
      httpOptions
    );
  }

  updateRoles(username: string, newRoles:string[]): Observable<any> {
    return this.http.post(
      AUTH_API + 'updateRole',
      {
        username,
      
        newRoles
        
      },
      httpOptions
    );
  }

  updatePassword(userId: string, newPassword:string, blocked=true): Observable<any> {
    return this.http.post(
      AUTH_API + 'change-password',
      {
        userId,
      
        userPassword: newPassword,
        blocked
        
      },
      httpOptions
    );
  }
}
