import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-partenaires',
  templateUrl: './partenaires.component.html',
  styleUrls: ['./partenaires.component.scss']
})
export class PartenairesComponent {

  showNavigationArrows = false;
  showNavigationIndicators = false;
  // images = [1,2,3,4].map((n) => `../../../assets/sponsors/${n}.png`);
  sponsors = [
    {
      src: "../../../assets/sponsors/1.png",
      alt: "Logo Société Générale"
    },
    {
      src: "../../../assets/sponsors/2.png",
      alt: "Logo Pumpkin"
    },
    {
      src: "../../../assets/sponsors/3.png",
      alt: "Logo Next"
    },
    {
      src: "../../../assets/sponsors/4.png",
      alt: "Logo Axel Design"
    },
    {
      src: "../../../assets/sponsors/5.png",
      alt: "Logo Laludikavern"
    },
    {
      src: "../../../assets/sponsors/6.png",
      alt: "Logo Le Bureau Des Goodies"
    },
    {
      src: "../../../assets/sponsors/7.png",
      alt: "Logo Arcade VR"
    },
    {
      src: "../../../assets/sponsors/8.png",
      alt: "Logo Pareil' Art"
    },
  ];

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
    config.interval = 3000;
    config.pauseOnHover = false;
    config.pauseOnFocus = false;
  }
}