import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { partition } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const elementID = params['part'];
      if (!elementID) { return; }
      setTimeout(function () {
        const element = document.getElementById(elementID);
        element.scrollIntoView({ behavior: "smooth" });
      }, 150);
      this.router.navigate([], { queryParams: { 'part': null } });
    });
  }

}
