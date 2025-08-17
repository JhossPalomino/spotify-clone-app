import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpotifyAuthApi } from './spotify-auth-api';

@Injectable({
  providedIn: 'root'
})
@Injectable({providedIn: 'root'})
export class SpotifyReleases {
  #http = inject(HttpClient);
  #auth = inject(SpotifyAuthApi);
  private apiUrl = 'https://api.spotify.com/v1';
  //private token = this.#auth.getAppToken();
  private token = localStorage.getItem('spotify_token');

  constructor(private http: HttpClient) {}

   getNewReleases(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

     return this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=20', { headers });
  }
}
