import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Video } from '../models/Video.model';
import firebase from '@firebase/app';
import '@firebase/database';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  videos: Video[] = [];
  videosSubject = new Subject<Video[]>();

  constructor() {
    this.getVideos();
  }

  emitVideos() {
    this.videosSubject.next(this.videos);
  }

  getVideos() {
    firebase.database().ref('/videos')
      .on('value', (data) => {
        this.videos = data.val() ? data.val() : [];
        this.emitVideos();
      })
  }
}
