import {Component, OnInit} from 'angular2/core';
import {VgPlayer} from "../vidogular/vg-player/vg-player";
import {VgAPI} from "../vidogular/services/vg-api";
import {VgFullscreenAPI} from "../vidogular/services/vg-fullscreen-api";
import {VgCuePoints} from "../vidogular/vg-cue-points/vg-cue-points";
import {NgIf, NgFor} from "angular2/common";
import {RouteParams} from "angular2/router";


@Component({
    selector: 'videoPageComponet',
    directives: [
        VgPlayer,
        VgCuePoints,
        NgFor,
        NgIf
    ],
    template: `
        <div class="row">
            <div class="col s9">
                <div class='box ratio16_9'>
                    <div class='content'>
                        <vg-player (onPlayerReady)="onPlayerReady($event)">
                            <vg-controls>
                               
                       
                                <vg-scrub-bar>
                                    <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>
                                    <vg-scrub-bar-current-time></vg-scrub-bar-current-time>
                                    <vg-scrub-bar-cue-points [cuePoints]="metadataTrack.cues"></vg-scrub-bar-cue-points>
                                </vg-scrub-bar>
                              
                            </vg-controls>
                            
                            <video id="singleVideo" preload="auto" controls>
                            
                                <source *ngFor="#video of sources" [src]="video.src" [type]="video.type">   
                                     
                                <track [src]="track" kind="metadata" label="Cue Points" default
                                       #metadataTrack
                                       vgCuePoints
                                       (onEnterCuePoint)="onEnterCuePoint($event)"
                                       (onExitCuePoint)="onExitCuePoint($event)"
                                       (onLoadCompleteCuePoints)="onLoadCompleteCuePoints($event)">
                            </video>
                        </vg-player>
                    </div>
                </div>
                <div class="card grey darken-4" style="height: 30%">
                    <div class="card-content white-text">
                        <span class="card-title">Sprungmarken</span>
                        <div *ngFor="#cuecuePoint of cuePoints">
                            <a (click)="seekToTime(cuecuePoint.startTime)">{{cuecuePoint.id}}</a>
                        </div>
                    </div>
                </div>
                
            </div>
                
            <div class="col s3">
                <div class="card grey darken-4" style="height: 80%">
                    <div class="card-content white-text">
                        <span class="card-title">Begleittext</span>
                        <div *ngIf="cuePointData.title">
                            <h5><a [href]="cuePointData.href">{{ cuePointData.title }}</a></h5>
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

    api: VgAPI;
    sources: Array<Object>;
    track: string;
    cuePointData: Object = {};
    cuePoints: TextTrackCue[];

    constructor(private _routeParams: RouteParams) {

        console.log(this._routeParams.get('id'));


        this.track = "./data/cue-points.vtt";
        this.sources = [
            {
                src: "data/Chaplin.mp4",
                type: "video/mp4"
            }
        ];
    }

    onPlayerReady(api: VgAPI) {
        this.api = api;
    }

    ngOnInit(): any {

        return undefined;
    }

    onEnterCuePoint($event) {
        this.cuePointData = JSON.parse($event.text);
        console.log($event);
    }

    onExitCuePoint($event) {
        this.cuePointData = {};
    }

    onLoadCompleteCuePoints($event) {
        this.cuePoints = $event;
        console.log(this.cuePoints);
    }

    seekToTime(time: number) {
        console.log(time);
        console.log(this.api);
        this.api.currentTime = time - .1;
    }
}
