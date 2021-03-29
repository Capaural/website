import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partenaires',
  templateUrl: './partenaires.component.html',
  styleUrls: ['./partenaires.component.scss']
})
export class PartenairesComponent implements OnInit {

  sponsors: any[] = [
    {
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png",
      height: 200,
      width: 250,
      alt: "Logo de base a changer"
    },
    {
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png",
      height: 200,
      width: 250,
      alt: "Logo de base a changer"
    },
    {
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png",
      height: 200,
      width: 250,
      alt: "Logo de base a changer"
    },
    {
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png",
      height: 200,
      width: 250,
      alt: "Logo de base a changer"
    },
    {
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png",
      height: 200,
      width: 250,
      alt: "Logo de base a changer"
    }];

  constructor() { }

  ngOnInit(): void {
  }

}
