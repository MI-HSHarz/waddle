import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/forkJoin';

import {Component, TemplateRef, OnChanges, ChangeDetectorRef} from 'angular2/core';
import {ContentloaderService} from "./services/contentloader.service";
import {StartComponent} from "./componets/start.component.ts";
import {ModuleComponent} from "./componets/module.component.ts";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {CORE_DIRECTIVES, NgSwitchWhen, NgSwitch, NgSwitchDefault} from "angular2/common";
import {UriEncodePipe} from "./pipes/uriEncode.pipe";
import {Content} from "./services/model";
import {PageComponent} from "./componets/page.component";
import {ImprintComponent} from "./componets/imprint.component";


@Component({
    directives: [
        ROUTER_DIRECTIVES,
        CORE_DIRECTIVES,
        NgSwitch,
        NgSwitchWhen,
        NgSwitchDefault
    ],
    pipes: [
        UriEncodePipe
    ],
    selector: 'app',
    template: `
        <header>
            <div class="navbar-fixed">
                <nav class="black" role="navigation">
                    <div class="nav-wrapper container">
                        <ul class="left">
                            <li>
                                <a [routerLink]="['/Start']" 
                                    (click)="start()">
                                    <i class="material-icons">home</i>
                                </a>
                            </li>
                            <li *ngIf="titel !== null" >
                                <a href="#/module/0">
                                    {{titel}}
                                </a>
                            </li>
                        </ul>

                        <ul class="right second">
                            <li>
                                <a [routerLink]="['/Imprint']" >
                                    Impressum
                                </a>
                            </li>
                        </ul>
                    </div>
                  
                </nav>
            </div>
            
        </header>

        <main id="main flow-text">
            <router-outlet></router-outlet>
        </main>
        `
})


@RouteConfig([
    {
        path: '/',
        component: StartComponent,
        name: 'Start'
    },
    // {
    //     path: '/module',
    //     component: ModuleComponent,
    //     name: 'Module'
    // },
    {
        path: '/module/:id',
        component: ModuleComponent,
        name: 'Module'
    },
    {
        path: '/page/:id',
        component: PageComponent,
        name: 'Page'
    },
    {
        path: '/imprint',
        component: ImprintComponent,
        name: 'Imprint'
    }
])

export class App {

    content: Content = new Content();
    titel: string = "";

    constructor(private _contentloaderService: ContentloaderService,
                private _cdr: ChangeDetectorRef) {

        this._contentloaderService.contentSubject.subscribe(content => {
            this.content = content;

            this._contentloaderService.modulTitelSubject.subscribe(titel => {

                    this.titel = titel;
                    setTimeout(() => this._cdr.reattach());
            });

        });

        //Videoabspielamarken löschen

        for (var key in localStorage) {
            // console.log(key);

            if ( key.startsWith("timeToStart")) {
                localStorage.removeItem(key);
            }
        }
    }

    start(){
        this.titel = "";
    }

}
