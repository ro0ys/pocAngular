import { Component, OnInit } from '@angular/core';
import { AppareilService } from './services/appareil.service';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs'
import 'rxjs/add/observable/interval';
import { Subscription } from 'rxjs/Subscription'
import { OnDestroy} from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  secondes: number;
  counterSubscription : Subscription;

  constructor (private authService: AuthService) {
  }

  ngOnInit() {
    const counter = Observable.interval(1000);
    this.counterSubscription = counter.subscribe(
      (value) => {
        this.secondes = value;
      }
    );
  }

  ngOnDestroy () {
    this.counterSubscription.unsubscribe();
  }
}
