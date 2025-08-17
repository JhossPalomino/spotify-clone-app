import { Component, OnInit } from '@angular/core';
import { SpotifyReleases } from '../../core/services/spotify-releases';
import { CommonModule } from '@angular/common';
import { SpotifyAuthApi } from '../../core/services/spotify-auth-api';

@Component({
  selector: 'app-home-spotify',
  imports: [CommonModule],
  templateUrl: './home-spotify.html',
  styleUrl: './home-spotify.scss'
})
export class HomeSpotify implements OnInit{
  albums: any[] = [];
  constructor(private spotifyReleases: SpotifyReleases, private auth: SpotifyAuthApi) {}
  
  ngOnInit(): void {
    this.auth.getAppToken().subscribe(token => {
      this.spotifyReleases.getNewReleases().subscribe(
        res => this.albums = res.albums.items,
        err => console.error('Error en releases', err)
      );
    });
  }

}
