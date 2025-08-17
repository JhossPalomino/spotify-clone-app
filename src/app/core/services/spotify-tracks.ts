import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyTracks {
  private apiUrl = 'https://api.spotify.com/v1';
  private accessToken = localStorage.getItem('spotify_token');

  constructor(private http: HttpClient) {}

  getTrack(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`
    });
    return this.http.get(`${this.apiUrl}/tracks/${id}`, { headers });
  }

  searchTracks(query: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`
    });
    return this.http.get(`${this.apiUrl}/search?q=${query}&type=track`, { headers });
  }
}
