import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Video } from '../models/Video.model';
import { VideosService } from '../services/videos.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  videos: Video[];
  videosSubscription: Subscription;

  constructor(private videosService: VideosService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.videos = null;
    this.videosSubscription = this.videosService.videosSubject.subscribe(
      (videos: Video[]) => {
        this.videos = videos;
        this.setUrlVideos(this.videos);
      }
    );
    if (!this.videos) {
      this.videosService.emitVideos();
    }
  }

  setUrlVideos(videos: Video[]) {
    const element = document.querySelector('.columns');
    element.innerHTML = "";

    if (videos.length != 0) {
      for (let i = videos.length-1; i >= 0; i--) {
          let video = videos[i];
          let content = '<div class="column mb-5"><h4>' + video.name + '</h4><iframe width="100%" height="500vh" src="' + video.link + '" allowfullscreen></iframe></div>';
          element.innerHTML += content;
      }
    }
  }
}
