import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Member } from '../models/Member.model';
import firebase from '@firebase/app';
import '@firebase/database';
import '@firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  members: Member[] = [];
  membersSubject = new Subject<Member[]>();

  constructor() {
    this.getMembers();
  }

  emitMembers() {
    this.membersSubject.next(this.members);
  }

  saveMembers() {
    firebase.database().ref('/members').set(this.members);
  }

  getMembers() {
    firebase.database().ref('/members')
      .on('value', (data) => {
        this.members = data.val() ? data.val() : [];
        this.emitMembers();
    })
  }

  getSingleGame(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/members/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewMember(newMember: Member) {
    this.members.unshift(newMember);
    this.saveMembers();
    this.emitMembers();
  }

  removeMember(game: Member) {
    if (game.photo) {
      const storageRef = firebase.storage().refFromURL(game.photo);
      storageRef.delete().then(
        () => {
          console.log("Photo supprimée !");
        }
      ).catch(
        (error) => {
          console.log("Fichier non trouvé : " + error);
        }
      );
    }
    const gameIndexToRemove = this.members.findIndex(
      (gameEl) => {
        if (gameEl === game) {
          return true;
        }
      }
    );
    this.members.splice(gameIndexToRemove, 1);
    this.saveMembers();
    this.emitMembers();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const uniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
                        .child('images/' + uniqueFileName + file.name)
                        .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement...');
          },
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
