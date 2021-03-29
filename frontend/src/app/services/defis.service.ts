import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Defi } from '../models/Defi.model';
import firebase from '@firebase/app';
import '@firebase/database';

@Injectable({
  providedIn: 'root'
})
export class DefisService {
  defis: Defi[] = [];
  defisSubject = new Subject<Defi[]>();

  constructor() {
    this.getDefis();
  }

  emitDefis() {
    this.defisSubject.next(this.defis);
  }

  saveDefis() {
    firebase.database().ref('/defis').set(this.defis);
  }

  getDefis() {
    firebase.database().ref('/defis')
      .on('value', (data) => {
        this.defis = data.val() ? data.val() : [];
        this.emitDefis();
      })
  }

  createNewDefis(newDefi: Defi) {
    this.defis.unshift(newDefi);
    this.saveDefis();
    this.emitDefis();
  }
}
