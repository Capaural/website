import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Rank } from 'src/app/models/rank.model';
import { ScoreboardService } from 'src/app/services/scoreboard.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  ranks: Rank[];
  ranksSubscription: Subscription;

  constructor(private scoreboardService: ScoreboardService) { }

  ngOnInit(): void {
    this.ranks = null;
    this.ranksSubscription = this.scoreboardService.ranksSubject.subscribe(
      (ranks: Rank[]) => {
        this.ranks = ranks;
      }
    );
    if (!this.ranks) this.scoreboardService.emitRanks();
  }
}
