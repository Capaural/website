import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Video } from '../models/Video.model';
import { VideosService } from '../services/videos.service';

@Component({
  selector: 'app-video-youtube',
  templateUrl: './video-youtube.component.html',
  styleUrls: ['./video-youtube.component.scss']
})
export class VideoYoutubeComponent implements OnInit {

  videos: Video[];
  videosSubscription: Subscription;

  constructor(private videosService: VideosService) { }

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
        let video = videos[this.videos.length -1];
        let content = '<div class="column mb-5"><iframe width="100%" height="500vh" src="' + video.link + '" allowfullscreen></iframe></div>';
        element.innerHTML += content;
    }
  }

}
