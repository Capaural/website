import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Rank } from '../models/rank.model';
import firebase from '@firebase/app';
import '@firebase/database';

@Injectable({
  providedIn: 'root'
})
export class ScoreboardService {
  ranks: Rank[] = [];
  ranksSubject = new Subject<Rank[]>();

  constructor() {
    this.getRanks();
  }

  emitRanks() {
    this.ranksSubject.next(this.ranks);
  }

  getRanks() {
    firebase.database().ref('/classement')
      .on('value', (data) => {
        this.ranks = data.val() ? data.val() : [];
        this.emitRanks();
      })
  }
}
