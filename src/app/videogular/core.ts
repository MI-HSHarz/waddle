import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import {VgPlayer} from "./vg-player/vg-player";
import {VgMedia} from "./vg-media/vg-media";
import {VgCuePoints} from "./vg-cue-points/vg-cue-points";
import {VgAPI} from "./services/vg-api";
import {VgFullscreenAPI} from "./services/vg-fullscreen-api";
import {VgUtils} from "./services/vg-utils";
import {VgEvents} from "./events/vg-events";
import {VgStates} from "./states/vg-states";


export * from './services/vg-api';
export * from './services/vg-fullscreen-api';
export * from './services/vg-utils';
export * from './events/vg-events';
export * from './states/vg-states';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ VgPlayer, VgMedia, VgCuePoints ],
    providers: [ VgAPI, VgFullscreenAPI, VgUtils, VgEvents, VgStates ],
    exports: [ VgPlayer, VgMedia, VgCuePoints ]
})
export class VgCore {}