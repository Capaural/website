import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Activity } from '../models/Activity.model';
import firebase from '@firebase/app';
import '@firebase/database';
import '@firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  planning: Activity[][] = [];
  planningSubject = new Subject<Activity[][]>();

  constructor() {
    this.getPlanning();
  }

  emitPlanning() {
    this.planningSubject.next(this.planning);
  }

  savePlanning() {
    firebase.database().ref('/planning').set(this.planning);
  }

  isHourLater(h1: string, h2: string) {
    const hh1 = h1.split("h");
    const hh2 = h2.split("h");

    return parseInt(hh1[0]) * 60 + parseInt(hh1[1]) < parseInt(hh2[0]) * 60 + parseInt(hh2[1]);
  }

  sortPlanning() {
    for (let d = 0; d < this.planning.length; d++) {
      let n = this.planning[d].length;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (this.isHourLater(this.planning[d][i].hour, this.planning[d][j].hour)) {
            [this.planning[d][i], this.planning[d][j]] = [this.planning[d][j], this.planning[d][i]];
          }
        }
      }
    }
  }

  getPlanning() {
    firebase.database().ref('/planning')
      .on('value', (data) => {
        this.planning = data.val() ? data.val() : [];
        this.sortPlanning();
        this.emitPlanning();
      })
  }

  createNewActivity(day: number, newActivity: Activity) {
    // this.planning.unshift([newActivity]); // Pour ajouter les jours de la semaine
    this.planning[day].unshift(newActivity); // Pour ajouter des activités a un jour particulier
    this.savePlanning();
    this.emitPlanning();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const uniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + uniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => { },
          (error) => {
            console.log('Erreur de chargement...');
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
}
