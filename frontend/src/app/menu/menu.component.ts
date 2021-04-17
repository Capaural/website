import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  timeToUnlock = "21h30";

  constructor() { }

  ngOnInit(): void {
  }

  isTime(value: string) {
    var timeToCompare = new Date();
    const now = new Date();

    let today_day = timeToCompare.getDate();
    let today_month = timeToCompare.getMonth();
    let today_year = timeToCompare.getFullYear();

    timeToCompare.setHours(parseInt(value.split('h')[0]), parseInt(value.split('h')[1]), 0);

    return now >= timeToCompare || (today_day >= 17 && today_month >= 3 && today_year >= 2021);
  }

}
