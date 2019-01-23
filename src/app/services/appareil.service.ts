import { Subject } from 'rxjs/Subject';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppareilService {

    appareilsSubject = new Subject<any[]>();

    private appareils = [];

    constructor(private httpClient : HttpClient) {

    }  

    saveAppareilsToServer() {
        this.httpClient.put('https://angularpoc-de63a.firebaseio.com/appareils.json', this.appareils)
        .subscribe(
            () => {
                console.log('Enregistrement terminé !');
            },
            (error) => {
                console.log('Erreur ! : ' + error);
            }
        );
    }

    getAppareilsFromServer() {
        this.httpClient.get<any[]>('https://angularpoc-de63a.firebaseio.com/appareils.json')
        .subscribe(
            (response) => {
                this.appareils = response;
                this.emitAppareilSubject();
            },
            (error) => {
                console.log('Erreur ! : ' + error);
            }
        )
    }   

    emitAppareilSubject() {
        this.appareilsSubject.next(this.appareils.slice());
    }

    switchOnAll() {
        for (let appareil of this.appareils) {
            appareil.status = 'allumé';
        }
        this.emitAppareilSubject()
    }
    
    switchOffAll() {
        for (let appareil of this.appareils) {
            appareil.status = 'éteint';
        }
        this.emitAppareilSubject()
    }  

    switchOnOne(index: number) {
        this.appareils[index].status = 'allumé';
        this.emitAppareilSubject()
    }

    switchOffOne(index: number) {
        this.appareils[index].status = 'éteint';
        this.emitAppareilSubject()
    }

    getAppareilById(idRecherche: number){
        return this.appareils.find(
            (appareil) => {
                return appareil.id === idRecherche
            }
        );
    }

    addAppareil(name: string, status: string) {
        const appareilObject = {
            id: 0,
            name: '',
            status: ''
        };
        appareilObject.name = name;
        appareilObject.status = status;
        appareilObject.id = this.appareils[(this.appareils.length -1)].id + 1;
        this.appareils.push(appareilObject);
        this.saveAppareilsToServer();
        this.emitAppareilSubject();
    }
}