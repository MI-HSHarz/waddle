import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/forkJoin';

import {Component, TemplateRef} from 'angular2/core';
import {ContentloaderService} from "./services/contentloader.service";
import {StartComponent} from "./componets/start.component.ts";
import {ModuleComponent} from "./componets/module.component.ts";
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
        <header>
            <div class="navbar-fixed">
                <nav class="black" role="navigation">
                    <div class="nav-wrapper container">
                        <ul class="left">
                            <li><a [routerLink]="['/Start']" ><i class="material-icons">home</i></a></li>
                            <li><a [routerLink]="['/Module']">Modul Name</a></li>
                        </ul>

                        <ul class="right second">
                            <li><a (click)="openNav()"><i class="material-icons">menu</i></a></li>
                            <li><a href="screen.html">Impressum</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
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

                        <ul>
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
    {
        path: '/module',
        component: ModuleComponent,
        name: 'Module'
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
