import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameInstance: any;
  progress = 0;
  isReady = false;

  constructor() { }

  ngOnInit(): void {
    const loader = (window as any).UnityLoader;

    this.gameInstance = loader.instantiate(
    'gameContainer', 
    '/assets/build/Build/WebGL_build.loader.js', {
    onProgress: (gameInstance: any, progress: number) => {
        this.progress = progress;
        if (progress === 1) {
          this.isReady = true;
        }
      }
    });
  }

}
