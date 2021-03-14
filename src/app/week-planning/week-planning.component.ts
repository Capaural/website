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
    "Vendredi 16 Avril",
    "Samedi 17 Avril",
  ];


  wantedDay: Activity[];
  wantedDayIndex: number = 0;

  constructor(private planningService: PlanningService) { }

  ngOnInit(): void {

    this.planning = null;
    this.planningSubscription = this.planningService.planningSubject.subscribe(
      (planning: Activity[][]) => {
        this.planning = planning;
        this.getWantedDay(0);
      }
    );
    if (!this.planning) this.planningService.emitPlanning();
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
