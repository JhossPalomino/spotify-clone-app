import { Component, inject, Input, SimpleChange } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayout } from '../../layout/main-layout/main-layout';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SpotifyAuthApi } from '../../core/services/spotify-auth-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-feature',
  imports: [CommonModule],
  templateUrl: './search-feature.html',
  styleUrl: './search-feature.scss'
})
export class SearchFeature {
  @Input() query: string = '';
  showSearch: boolean = false;
  results: any;
  authApi = inject(SpotifyAuthApi);
  

  constructor(private spotify: MainLayout, private http: HttpClient,private router: Router) {}


  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  onSearch(): void {
    if (!this.query.trim()) return;
    this.spotify.search(this.query, ['track', 'artist'], 'PE', 10).subscribe((data: any) => {
      this.results = data;
    });
  }

  ngOnChanges(changes: SimpleChange) {
    if (this.query) {
      const token = this.authApi.token;
      console.log('Query recibida:', this.query)
      if (!token) {
  console.warn('No hay token disponible. ¿Ya hiciste login?');
  return;
}


const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`
});
      const params = {
        q: this.query,
        type: 'track,artist',
        market: 'PE',
        limit: '10'
      };

      this.http.get('https://api.spotify.com/v1/search', { headers, params })
        .subscribe({
  next: (data: any) => {
    console.log('Resultados recibidos:', data);
    this.results = data;
  },
  error: (err: any) => {
    console.error('Error en la búsqueda:', err);
  }
    })
  }}

  goToTrack(id: string): void {
    this.router.navigate(['/track',id])
  }
    
}
