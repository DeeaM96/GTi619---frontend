import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecuritySettingsService {

  private baseUrl = 'http://localhost:5050/api/security-settings';

  constructor(private http: HttpClient) { }

  saveSettings(settings: any) {
    return this.http.post(`${this.baseUrl}/updateSettings`, settings);
  }

  

    getSettings() {
      return this.http.get<{[key: string]: string}>(this.baseUrl);
    }

}
