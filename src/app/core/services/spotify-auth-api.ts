import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { SpotifyTokenResponse } from '../interfaces/spotify-response';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthApi {
  #http = inject(HttpClient);

  login(): void {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: env.spotify.clientId,
      scope: env.spotify.scope,
      redirect_uri: env.spotify.redirectUri,
    });

    window.location.href = `${ env.spotify.authorizationUrl }?${ params.toString() }`;
  }

  exchangeCodeForToken(code: string) {
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: env.spotify.redirectUri
    });

    const basic = btoa(`${ env.spotify.clientId }:${ env.spotify.clientSecret }`);
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${ basic }`
    };

    return this.#http.post<SpotifyTokenResponse>(env.spotify.tokenUrl, body.toString(), { headers })
      .pipe(tap(res => localStorage.setItem('spotify_token', res.access_token)));
  }

  logout(): void {
    localStorage.removeItem('spotify_token');
  }

  get isLogging(): boolean {
    return !!localStorage.getItem('spotify_token');
  }

  get token(): string | null {
    return localStorage.getItem('spotify_token');
    console.log('Token obtenido:', this.token);
  }

  getAppToken(): Observable<string> {
  const body = new HttpParams()
    .set('grant_type', 'client_credentials');

  const headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa(`${'8f2d9cf1214a4217baae93a4b954b9a3'}:${'c682e290323444959b1cba2af5fd4627'}`),
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  return this.#http.post<any>('https://accounts.spotify.com/api/token', body.toString(), { headers })
    .pipe(
    tap(res => localStorage.setItem('spotify_token', res.access_token)),
    map(res => res.access_token));
  }

}
