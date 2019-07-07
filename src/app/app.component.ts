import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from './animations';
import { RouterOutlet } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit{
  title = 'course-app';

  getAnimationData(outlet: RouterOutlet) {
    let value = outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    console.log(value);
    return value;
  }

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyDLPNtt3FrezV0pEdez98B1ww9ZUww1niE",
      authDomain: "recipesandsh.firebaseapp.com",
      databaseURL: "https://recipesandsh.firebaseio.com",
      projectId: "recipesandsh",
      storageBucket: "recipesandsh.appspot.com",
      messagingSenderId: "83516080112",
      appId: "1:83516080112:web:72d29ba4c64600fa"
    });
  }
}
