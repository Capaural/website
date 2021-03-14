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

  getPlanning() {
    firebase.database().ref('/planning')
      .on('value', (data) => {
        this.planning = data.val() ? data.val() : [];
        this.emitPlanning();
    })
  }

  createNewActivity(day: number, newActivity: Activity) {
    this.planning[day].unshift(newActivity); // Pour ajouter des activités a un jour particulier
    // this.planning.unshift([newActivity]); // Pour ajouter les jours de la semaine
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
          () => {},
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
