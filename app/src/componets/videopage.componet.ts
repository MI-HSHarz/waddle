import {Component, OnInit} from 'angular2/core';
import {VgPlayer} from "../vidogular/vg-player/vg-player";
import {VgAPI} from "../vidogular/services/vg-api";
import {VgFullscreenAPI} from "../vidogular/services/vg-fullscreen-api";
import {VgCuePoints} from "../vidogular/vg-cue-points/vg-cue-points";
import {VgOverlayPlay} from "../vidogular/vg-overlay-play/vg-overlay-play";
import {NgIf, NgFor} from "angular2/common";
import {VgFullscreen} from "../vidogular/vg-controls/vg-fullscreen/vg-fullscreen";
import {RouteParams} from "angular2/router";

@Component({
    selector: 'videoPageComponet',
    directives: [
        VgPlayer,
        VgCuePoints,
        VgOverlayPlay,
        NgFor,
        NgIf
    ],
    template: `
        <div class="row">
            <div class="col s9">
                <div class='box ratio16_9'>
                    <div class='content'>
                        <vg-player>
                            <vg-controls>
                                <vg-play-pause></vg-play-pause>
                                <vg-playback-button></vg-playback-button>
                        
                                <vg-time-display>{{ media?.time?.current | date:'mm:ss' }}</vg-time-display>
                        
                                <vg-scrub-bar>
                                    <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>
                                    <vg-scrub-bar-current-time></vg-scrub-bar-current-time>
                                    <vg-scrub-bar-cue-points [cuePoints]="metadataTrack.cues"></vg-scrub-bar-cue-points>
                                </vg-scrub-bar>
                        
                                <vg-time-display>{{ media?.time?.left | date:'mm:ss' }}</vg-time-display>
                                <vg-time-display>{{ media?.time?.total | date:'mm:ss' }}</vg-time-display>
                        
                                <vg-mute></vg-mute>
                        
                                <vg-fullscreen></vg-fullscreen>
                            </vg-controls>
                            
                            <video id="singleVideo" preload="auto" controls>
                            
                                <source *ngFor="#video of sources" [src]="video.src" [type]="video.type">   
                                     
                                <track [src]="track" kind="metadata" label="Cue Points" default
                                       #metadataTrack
                                       vgCuePoints
                                       (onEnterCuePoint)="onEnterCuePoint($event)"
                                       (onExitCuePoint)="onExitCuePoint($event)">
                            </video>
                        </vg-player>
                    </div>
                </div>
            </div>
                
            <div class="col s3">
                <div class="card grey darken-4" style="height: 80%">
                    <div class="card-content white-text">
                        <span class="card-title">Begleittext</span>
                        <div *ngIf="cuePointData.title">
                            <h3><a [href]="cuePointData.href">{{ cuePointData.title }}</a></h3>
                            <p>{{ cuePointData.description }}</p>
                            <img [src]="cuePointData.src" width="100%">
                        </div>
                    </div>
                </div>
            </div>
        </div>
  `
})

export class VideoPageComponent implements OnInit {

    sources: Array<Object>;
    track: string;
    cuePointData: Object = {};
    
    controls: boolean = false;
    autoplay: boolean = true;
    loop: boolean = false;
    preload: string = 'auto';
    api: VgAPI;
    fsAPI: VgFullscreenAPI = false;

    constructor(private _routeParams: RouteParams) {

        console.log(this._routeParams.get('id'));

        this.fsAPI = VgFullscreenAPI;

        this.track = "./data/cue-points.vtt";
        this.sources = [
            {
                src: "data/Chaplin.mp4",
                type: "video/mp4"
            }
        ];
    }

    ngOnInit(): any {

        return undefined;
    }

    onPlayerReady(api: VgAPI) {
        this.api = api;
    }

    onEnterCuePoint($event) {
        this.cuePointData = JSON.parse($event.text);
        console.log($event);
    }

    onExitCuePoint($event) {
        this.cuePointData = {};
    }
}
