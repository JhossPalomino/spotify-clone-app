import { Component, inject } from '@angular/core';
import { SpotifyAuthApi } from '../../core/services/spotify-auth-api';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SearchFeature } from "../../feature/search-feature/search-feature";
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HomeSpotify } from "../../feature/home-spotify/home-spotify";

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    SearchFeature,
    CommonModule,
    HomeSpotify
],
  templateUrl: './main-layout.html',
  styles: ``
})
export class MainLayout {
  authApi = inject(SpotifyAuthApi);
  http = inject(HttpClient);
  query: string = '';
  showSearch: boolean = false;

  login(): void {
    this.authApi.login();
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  onSearch(): void {
    this.showSearch = true;
    console.log('Buscando:', this.query);
    if (!this.query.trim()) return;
  }

   search(query: string, types: string[], market: string, limit: number): Observable<any> {
    // Replace with actual search logic as needed
    return new Observable<any>();
  }
}
