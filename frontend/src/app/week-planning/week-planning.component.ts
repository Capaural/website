import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Activity } from '../models/Activity.model';
import { PlanningService } from '../services/planning.service';

@Component({
  selector: 'app-week-planning',
  templateUrl: './week-planning.component.html',
  styleUrls: ['./week-planning.component.scss']
})
export class WeekPlanningComponent implements OnInit {

  planning: Activity[][];
  planningSubscription: Subscription;

  days = [
    "Lundi 12 Avril",
    "Mardi 13 Avril",
    "Mercredi 14 Avril",
    "Jeudi 15 Avril",
    "Vendredi 16 Avril"
  ];


  wantedDay: Activity[];
  wantedDayIndex: number = 0;

  constructor(private planningService: PlanningService) { }

  ngOnInit(): void {
    this.planning = null;
    this.planningSubscription = this.planningService.planningSubject.subscribe(
      (planning: Activity[][]) => {
        this.planning = planning;
        this.getWantedDay(this.getCurrentDay());
      }
    );
    if (!this.planning) this.planningService.emitPlanning();
  }

  getCurrentDay() {
    let date = new Date();
    let today = date.getDay();
    let today_day = date.getDate();
    let today_month = date.getMonth();
    let today_year = date.getFullYear();

    if (today_day >= 17 && today_month >= 3 && today_year >= 2021) return 0;
    else return today - 1;
  }
  
  getWantedDay(index) {
    this.wantedDayIndex = index;
    this.wantedDay = this.planning[this.wantedDayIndex];
  }

  createActivity() {
    const newActivity = new Activity("is-info", "is-warning", null, "15h15", "Activité", "Description de l'activité");
    this.planningService.createNewActivity(0, newActivity);
  }
}
