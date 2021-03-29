import { Component, OnInit } from '@angular/core';
declare const createUnityInstance: any;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameInstance: any;
  progress = 0;
  isReady = false;

  constructor() {}

  ngOnInit(): void {
    createUnityInstance(document.querySelector("#unity-canvas"), {
      dataUrl: "Build/WebGL build.data.unityweb",
      frameworkUrl: "Build/WebGL build.framework.js.unityweb",
      codeUrl: "Build/WebGL build.wasm.unityweb",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "ExoCarrot",
      productName: "Capaural",
      productVersion: "0.1",
    },null);
  }

}
