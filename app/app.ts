import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/forkJoin';

import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';
import {VideoComponent} from "./src/componets/video.componet";


@Component({
    directives: [
        VideoComponent
    ],
    selector: 'app',
    template: `
test
<videoComponet></videoComponet>
    
  `
})

export class App {


    // constructor() {
    // }



}

bootstrap(App);
