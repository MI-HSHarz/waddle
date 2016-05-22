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
                            <li><a onclick="$('#modal1').openModal();" >Impressum</a></li>
                        </ul>
                    </div>
                  
                </nav>
            </div>
            
        </header>

        <main id="main flow-text">
            <div id="modal1" class="modal">
                <div class="modal-content">
                    <h4>Impressum</h4>
                    <div class="input-field col s12">
                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button class=" modal-action modal-close waves-effect btn-flat"
                        onclick="$('#modal1').closeModal();">
                            schließen
                    </button>
                </div>
             </div>
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
