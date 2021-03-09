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
      } else {
        this.router.navigate(["home"], { queryParams: { part: element } });
      }
    } else {
      elementPart.scrollIntoView({ behavior: "smooth" });
    }
  }
}
