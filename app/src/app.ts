import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/forkJoin';

import {Component, TemplateRef} from 'angular2/core';
import {VideoPageComponent} from "./componets/videopage.componet.ts";
import {ContentloaderService} from "./services/contentloader.service";
import {StartComponent} from "./componets/start.component.ts";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {CORE_DIRECTIVES, NgSwitchWhen, NgSwitch, NgSwitchDefault} from "angular2/common";
import {UriEncodePipe} from "./pipes/uriEncode.pipe";
import {Content} from "./services/model";
import {TextPageComponent} from "./componets/textPage.component";


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
                        
                                <a *ngSwitchWhen="'textPage'" (click)="closeNav()"
                                    href="#/text-page/{{page.$href | uriEncode}}">
                                    {{page.menuName}}
                                </a>
                                <a *ngSwitchWhen="'videoPage'" (click)="closeNav()"
                                    href="#/video-page/{{page.$href | uriEncode}}">
                                    {{page.menuName}}
                                </a>
                                <a *ngSwitchDefault (click)="closeNav()">
                                    {{page.menuName}} kein gültiger Seitentype
                                </a>
                        </div>

                        <ul >
                            <li *ngFor="#subpage of page.subPages" >
                                <div [ngSwitch]="subpage.type">
                        
                                    <a *ngSwitchWhen="'textPage'" (click)="closeNav()"
                                        href="#/text-page/{{subpage.$href | uriEncode}}">
                                        {{subpage.menuName}}
                                    </a>
                                    <a *ngSwitchWhen="'videoPage'" (click)="closeNav()"
                                        href="#/video-page/{{subpage.$href | uriEncode}}">
                                        {{subpage.menuName}}
                                    </a>
                                    <a *ngSwitchDefault (click)="closeNav()">
                                        {{subpage.menuName}} kein gültiger Seitentype
                                    </a>
                                 </div>
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
        path: '/video-page',
        component: VideoPageComponent,
        name: 'Page'
    },
    {
        path: '/video-page/:id',
        component: VideoPageComponent,
        name: 'VideoPage'
    },
    {
        path: '/text-page/:id',
        component: TextPageComponent,
        name: 'TextPage'
    }
])

export class App {

    content: Content = new Content;

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
