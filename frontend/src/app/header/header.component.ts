import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  scrollToElement(element: string): void {
    var elementPart = document.getElementById(element);
    if (!elementPart) {
      if (element == "game") {
        this.router.navigate(["game"]);
      } else if (element == "defis") {
        this.router.navigate(["defis"]);
      } else if (element == "allos") {
        this.router.navigate(["allos"]);
      } else if (element == "videos") {
        this.router.navigate(["videos"]);
      } else if (element == "enigma") {
        this.router.navigate(["enigme"]);
      } else {
        this.router.navigate(["home"], { queryParams: { part: element } });
      }
    } else {
      elementPart.scrollIntoView({ behavior: "smooth" });
    }
  }
}
