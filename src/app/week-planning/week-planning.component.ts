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

  wantedDay: Activity[];

  constructor(private planningService: PlanningService) { }

  ngOnInit(): void {

    this.planning = null;
    this.planningSubscription = this.planningService.planningSubject.subscribe(
      (planning: Activity[][]) => {
        this.planning = planning;
        this.getWantedDay();
      }
    );
    if (!this.planning) this.planningService.emitPlanning();
  }
  
  getWantedDay() {
    this.wantedDay = this.planning[0];
  }

  createActivity() {
    const newActivity = new Activity("is-info", "is-warning", null, "13h00", "Maurice", "Jouer avec Maurice");
    this.planningService.createNewActivity(0, newActivity);
  }
}
