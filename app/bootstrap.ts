import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/forkJoin';

import {bootstrap} from 'angular2/platform/browser';
import {App} from "./src/app";
import {ROUTER_PROVIDERS, HashLocationStrategy, LocationStrategy} from "angular2/router";
import {HTTP_PROVIDERS} from "angular2/http";

import {ContentloaderService} from "./src/services/contentloader.service";
import {PageService} from "./src/services/page.service";
import {provide} from "angular2/core";

bootstrap(App, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    ContentloaderService,
    PageService,
    provide(
        LocationStrategy,
        {useClass: HashLocationStrategy}
    )
]);
