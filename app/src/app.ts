import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/forkJoin';

import {Component} from 'angular2/core';
import {VideoPageComponent} from "./componets/videopage.componet.ts";
import {ContentloaderService, Content} from "./services/contentloader.service";
import {StartComponent} from "./componets/start.component.ts";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {CORE_DIRECTIVES} from "angular2/common";
import {UriEncodePipe} from "./pipes/uriEncode.pipe";


@Component({
    directives: [
        ROUTER_DIRECTIVES,
        CORE_DIRECTIVES
    ],
    pipes: [
        UriEncodePipe
    ],
    selector: 'app',
    template: `
        <nav>
            <div class="nav-wrapper">
                <a href="#" class="brand-logo">Waddle</a>
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
                         <a href="#/video-page/{{page.$href | uriEncode}}"
                            (click)="closeNav()">
                            {{page.menuName}}
                        </a>
                        <ul >
                           <li *ngFor="#subpage of page.subPages" 
                                (click)="closeNav()">
                                {{subpage.menuName}}
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
