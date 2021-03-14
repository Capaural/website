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
  }

}
