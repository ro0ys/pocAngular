import { Component, OnInit } from '@angular/core';
import { AppareilService } from './services/appareil.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts = [
    {
      title: "OverWatch", content: "OverWatch c'est top!"
    },
    {
      title: "Fortnite",
      content: "Fortnite cé tro bi1!!!"
    }
  ]

  constructor () {
    
  }
}
