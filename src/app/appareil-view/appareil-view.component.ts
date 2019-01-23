import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.css']
})

export class AppareilViewComponent {

  isAuth = false;

  appareils : any[];
  appareilSubscription: Subscription;

  constructor(private appareilService: AppareilService, private authService: AuthService) {
      this.isAuth = this.authService.isAuth;
  }

  ngOnInit() {
    this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
    this.appareilService.getAppareilsFromServer();
    this.appareilService.emitAppareilSubject();
  }

  onAllumer() {
    this.appareilService.switchOnAll();
   }

   onEteindre() {
    this.appareilService.switchOffAll();
   }

   onSave() {
     this.appareilService.saveAppareilsToServer();
   }

}
