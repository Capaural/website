import { Component } from '@angular/core';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyCFecXxHpNtDyTFRSroxCERa-FnxM7c708",
      authDomain: "capaural-717e1.firebaseapp.com",
      databaseURL: "https://capaural-717e1.firebaseio.com",
      projectId: "capaural-717e1",
      storageBucket: "capaural-717e1.appspot.com",
      messagingSenderId: "789585726",
      appId: "1:789585726:web:754d3c1bddfce2e100166f",
      measurementId: "G-1ESL5CW0VW"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
