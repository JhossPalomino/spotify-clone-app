import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyTracks } from '../../core/services/spotify-tracks';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track-detail',
  imports: [CommonModule],
  templateUrl: './track-detail.html',
  styleUrl: './track-detail.scss'
})
export class TrackDetail {
  track: any;
  spotifyEmbedUrl: SafeResourceUrl | null = null;
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private spotifyTracks: SpotifyTracks, private router:Router){}

ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id')!;
  this.spotifyTracks.getTrack(id).subscribe(data => {
    this.track = data;
  });

  console.log('Track ID:', id);

  if (id) {
    this.spotifyEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://open.spotify.com/embed/track/${id}`
    );
  }
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  }
