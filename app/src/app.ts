import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/forkJoin';

import {Component} from 'angular2/core';
import {VideoComponent} from "./componets/video.componet";


@Component({
    directives: [
        VideoComponent
    ],
    selector: 'app',
    template: `
        <nav>
            <div class="nav-wrapper">
                <!--<a href="#" class="brand-logo">waddle</a>-->
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><a (click)="openNav()"><i class="material-icons">menu</i></a></li>
                </ul>
            </div>
        </nav>
        
        <div id="myNav" class="overlay">
            <a href="javascript:void(0)" class="closebtn" (click)="closeNav()">×</a>
            <div class="overlay-content">
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Clients</a>
                <a href="#">Contact</a>
            </div>
         </div>
        
        
        
        <videoComponet></videoComponet> 
        `
})

export class App {


    // constructor() {
    // }

    openNav() {
        document.getElementById("myNav").style.height = "100%";
    }

    closeNav() {
        document.getElementById("myNav").style.height = "0%";
    }

}
