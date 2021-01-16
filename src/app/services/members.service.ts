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

  createNewMember(newMember: Member) {
    this.members.unshift(newMember);
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
