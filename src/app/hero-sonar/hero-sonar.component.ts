import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-sonar',
  templateUrl: './hero-sonar.component.html',
  styleUrls: ['./hero-sonar.component.scss']
})
export class HeroSonarComponent implements OnInit {

  peoples: any[];
  time = 2.5;
  constructor() { }

  ngOnInit(): void {
    var peopleCount = 2;
    this.peoples = [];

    for (let i = 0; i < peopleCount; i++) {
      this.peoples.push({
        distance: Math.floor((Math.random() * 140) + 1),
        angle: Math.floor((Math.random() * 360) + 1)
      });
    }
    this.radar();
  }


  radar() {

    var radius = 250;
    for (let i = 0; i < this.peoples.length; i++) {
      var disX = (90 < this.peoples[i].angle + 90) || (this.peoples[i].angle + 90 < 270) ? radius - this.peoples[i].distance : radius,
        disY = (180 < this.peoples[i].angle + 90) || (this.peoples[i].angle + 90 < 360) ? radius - this.peoples[i].distance : radius,
        angleNew = (this.peoples[i].angle + 90) * Math.PI / 180,
        getDegX = disX + this.peoples[i].distance - Math.round(this.peoples[i].distance * Math.cos(angleNew)),
        getDegY = disY + this.peoples[i].distance - Math.round(this.peoples[i].distance * Math.sin(angleNew));

        this.peoples[i].top = getDegY;
        this.peoples[i].left = getDegX;
        this.peoples[i].delay = this.time / radius * (this.peoples[i].distance + 5);
    }
  }
}
