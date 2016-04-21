import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/forkJoin';

import {Component, TemplateRef} from 'angular2/core';
import {ContentloaderService} from "./services/contentloader.service";
import {StartComponent} from "./componets/start.component.ts";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {CORE_DIRECTIVES, NgSwitchWhen, NgSwitch, NgSwitchDefault} from "angular2/common";
import {UriEncodePipe} from "./pipes/uriEncode.pipe";
import {Content} from "./services/model";
import {PageComponent} from "./componets/page.component";


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
        <nav class=" grey darken-4">
            <div class="nav-wrapper">
                <!--<a href="#" class="brand-logo">Waddle</a>-->
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><a (click)="openNav()"><i class="material-icons">menu</i></a></li>
                </ul>
            </div>
        </nav>
        
        <div id="myNav" class="overlay">
            <a href="javascript:void(0)" class="closebtn" (click)="closeNav()">×</a>
            <div class="overlay-content">

                <ul>
                    <li *ngFor="#page of content.pages">
                         
                        <div [ngSwitch]="page.type">
                            <a (click)="closeNav()"
                                href="#/page/{{page.$href | uriEncode}}">
                                    {{page.menuName}}
                            </a>
                        </div>

                        <ul >
                            <li *ngFor="#subpage of page.subPages" >
                                <a (click)="closeNav()"
                                        href="#/page/{{subpage.$href | uriEncode}}">
                                        {{subpage.menuName}}
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
                
            </div>
         </div>

        <main>
            <router-outlet ></router-outlet>
        </main>
        `
})


@RouteConfig([
    {
        path: '/',
        component: StartComponent,
        name: 'Start'
    },
    {
        path: '/page/:id',
        component: PageComponent,
        name: 'Page'
    }
])

export class App {

    content: Content = new Content();

    constructor(private _contentloaderService: ContentloaderService) {
        this._contentloaderService.contentSubject.subscribe(content => {
            this.content = content;
            
        });
    }

    openNav() {
        document.getElementById("myNav").style.height = "100%";
    }

    closeNav() {
        document.getElementById("myNav").style.height = "0%";
    }

}
