import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Defi } from '../models/Defi.model';
import { DefisService } from '../services/defis.service';

@Component({
  selector: 'app-defi-list',
  templateUrl: './defi-list.component.html',
  styleUrls: ['./defi-list.component.scss']
})
export class DefiListComponent implements OnInit {

  defis: Defi[];
  planningSubscription: Subscription;

  constructor(private defisService: DefisService) { }

  ngOnInit(): void {
    this.defis = null;
    this.planningSubscription = this.defisService.defisSubject.subscribe(
      (defis: Defi[]) => {
        this.defis = defis;
      }
    );
    if (!this.defis) this.defisService.emitDefis();
  }
}
