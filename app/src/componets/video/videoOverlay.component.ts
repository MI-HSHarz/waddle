import {Component, OnInit, Input, Output, EventEmitter, ElementRef, AfterViewInit} from 'angular2/core';
import {VgPlayer} from "../../vidogular/vg-player/vg-player";
import {VgAPI} from "../../vidogular/services/vg-api";
import {VgFullscreenAPI} from "../../vidogular/services/vg-fullscreen-api";
import {VgCuePoints} from "../../vidogular/vg-cue-points/vg-cue-points";
import {NgIf, NgFor} from "angular2/common";
import {RouteParams} from "angular2/router";
import {Cue} from "../../services/model";
import {VgFullscreen} from "../../vidogular/vg-controls/vg-fullscreen/vg-fullscreen";
import {VgOverlayPlay} from "../../vidogular/vg-overlay-play/vg-overlay-play";
import {VgControls} from "../../vidogular/vg-controls/vg-controls";
import {VgPlayPause} from "../../vidogular/vg-controls/vg-play-pause/vg-play-pause";
import {VgPlaybackButton} from "../../vidogular/vg-controls/vg-playback-button/vg-playback-button";
import {VgScrubBar} from "../../vidogular/vg-controls/vg-scrub-bar/vg-scrub-bar";
import {VgScrubBarCurrentTime}
    from "../../vidogular/vg-controls/vg-scrub-bar/vg-scrub-bar-current-time/vg-scrub-bar-current-time";
import {VgScrubBarBufferingTime}
    from "../../vidogular/vg-controls/vg-scrub-bar/vg-scrub-bar-buffering-time/vg-scrub-bar-buffering-time";
import {VgMute} from "../../vidogular/vg-controls/vg-mute/vg-mute";
import {RoundPipe} from "../../pipes/round.pipe";
import {indexOfId} from "../../util/comon";
import {VideoInfoBoxComponent} from "./videoInfoBox.componet";
import {timeout} from "rxjs/operator/timeout";
import {isUndefined} from "../../util/util";
import {initializeGenericWorkerRenderer} from "angular2/src/platform/worker_render_common";


@Component({
    selector: 'videoOverlayComponet',
    directives: [
        VgPlayer,
        VgCuePoints,
        VgOverlayPlay,
        VgControls,
        VgPlayPause,
        VgPlaybackButton,
        VgScrubBar,
        VgScrubBarCurrentTime,
        VgScrubBarBufferingTime,
        VgMute,
        VgFullscreen,
        NgFor,
        NgIf,
        VideoInfoBoxComponent
    ],
    template: `
        <div class="second-player active" style="opacity: {{opacity}}">
            <!--[ngClass]="{active: introVideoIsPlaying}">-->
            
            <vg-player (onPlayerReady)= "onPlayerReady($event)">
            
                <vg-overlay-play></vg-overlay-play>
                <vg-controls  [autohide]="true" [autohideTime]="1.5">
               	    <vg-play-pause></vg-play-pause>
               	    <vg-time-display>{{ media?.time?.current | date:'mm:ss' }}</vg-time-display>
               	    <vg-scrub-bar>
               	    	<vg-scrub-bar-current-time></vg-scrub-bar-current-time>
               	    	<vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>
               	    </vg-scrub-bar>
               	    <vg-time-display>{{ media?.time?.left | date:'mm:ss' }}</vg-time-display>
               	    <vg-mute></vg-mute>
               	    <vg-fullscreen></vg-fullscreen>
               </vg-controls>
            	
                <video #media id="singleVideo" preload="auto" [controls]="controls">
                    <source [src]="source" type="video/mp4">
                    
                    </video>
            	
            </vg-player>
                                        
        </div>          
  `
})

export class VideoOverlayComponent implements OnInit {

    @Input('source') source: string;
    @Output('onVideoOverlayFinish') onVideoOverlayFinish: EventEmitter<any> = new EventEmitter();

    api: VgAPI;
    elem: HTMLElement;

    loop: boolean = false;
    preload: string = 'auto';
    fsAPI: VgFullscreenAPI;
    interval;
    opacity: number = 0;

    constructor() {
        console.log("VideoOverlayComponent");
        this.fsAPI = VgFullscreenAPI;
    }

    onPlayerReady(api: VgAPI) {
        this.opacity = 1;
        this.api = api;
        this.api.play();
        this.interval = setInterval(() => this.isPlayerReady(), 200 );
    }

    ngOnInit(): any {
        return undefined;
    }

    private isPlayerReady() {
        if (this.api !== null && this.api !== undefined) {

            if ( (this.api.duration - this.api.currentTime) < 1 ) {

                this.opacity = 0;
            }

            if (this.api.isCompleted) {
                clearInterval(this.interval);
                //console.log("isCompleted");
                this.onVideoOverlayFinish.next();
            }
        }

    }
}
