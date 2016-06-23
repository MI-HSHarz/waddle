import {Component, OnInit, Input, Output, EventEmitter, ElementRef} from 'angular2/core';
import {VgPlayer} from "../vidogular/vg-player/vg-player";
import {VgAPI} from "../vidogular/services/vg-api";
import {VgFullscreenAPI} from "../vidogular/services/vg-fullscreen-api";
import {VgCuePoints} from "../vidogular/vg-cue-points/vg-cue-points";
import {NgIf, NgFor} from "angular2/common";
import {RouteParams} from "angular2/router";
import {Cue} from "../services/model";
import {VgFullscreen} from "../vidogular/vg-controls/vg-fullscreen/vg-fullscreen";
import {VgOverlayPlay} from "../vidogular/vg-overlay-play/vg-overlay-play";
import {VgControls} from "../vidogular/vg-controls/vg-controls";
import {VgPlayPause} from "../vidogular/vg-controls/vg-play-pause/vg-play-pause";
import {VgPlaybackButton} from "../vidogular/vg-controls/vg-playback-button/vg-playback-button";
import {VgScrubBar} from "../vidogular/vg-controls/vg-scrub-bar/vg-scrub-bar";
import {VgScrubBarCurrentTime} from "../vidogular/vg-controls/vg-scrub-bar/vg-scrub-bar-current-time/vg-scrub-bar-current-time";
import {
    VgScrubBarBufferingTime
}
    from "../vidogular/vg-controls/vg-scrub-bar/vg-scrub-bar-buffering-time/vg-scrub-bar-buffering-time";
import {VgMute} from "../vidogular/vg-controls/vg-mute/vg-mute";
import {RoundPipe} from "../pipes/round.pipe";
import {indexOfId} from "../util/comon";


@Component({
    selector: 'videoComponet',
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
        NgIf
    ],
    pipes: [
        RoundPipe
    ],
    template: `
    <div class="" id="screen" 
        [ngClass]="{expanded: !hasSmallControlls, small: hasSmallControlls}">
                
        <div class="row">
            <div class="col s12">
                <div class="card grey darken-4">
                    <div class="card-content white-text">
                        <span class="card-title"><h4>{{titel}}</h4></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col s12 m12 l12">
                <div class="video-padding-box">
                    <div class="box ratio16_9">
                        <div class="content">

                            <vg-player
                                    (onPlayerReady)= "onPlayerReady($event)">
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
                </div>
            </div>

           <!--<div class="col s12 m5 l4">-->
               <!--<div class="card full grey darken-4">-->
                   <!--<div class="card-content white-text">-->
                       <!--<span class="card-title">Begleittext</span>-->
                       <!--<div *ngIf="cuePointData.title">-->
                           <!--<h5><a [href]="cuePointData.href">{{ cuePointData.title }}</a></h5>-->
                           <!--<p>{{ cuePointData.description }}</p>-->
                           <!--<img [src]="cuePointData.src" width="100%">-->
                       <!--</div>-->
                   <!--</div>-->
               <!--</div>-->
            <!--</div>-->
            
        </div>        
    </div>
     
    <div class="section col" id="screen-sidebar-expanded"
        *ngIf="!hasSmallControlls">
        <div class="row dark">
            <div class="main">
                <ul class="sidebar-collection">
                
                    <li *ngFor="#cuePoint of cuePoints" class="collection-item"
                        [ngClass]="{active: cuePoint.id === avtivCue.id}"
                        (click)="jumpToCue(cuePoint)">
                            
                        <div class="collapsible-header">
                                
                            <div class="collection-image">
                                <img src="{{cuePoint.src}}" alt="" class="responsive-img">
                            </div>
                            <span class="title">{{cuePoint.title}}</span>
                            <p>{{cuePoint.startTime | round}}<br>
                             Dauer: {{cuePoint.duration | round}}
                             </p>
                         </div>
                         <div class="collapsible-body"><p>{{ cuePointData.description }}</p></div>
                    </li>
                  </ul>
            </div>
            <div class="down">
                <nav class="transparent">
                    <div class="nav-wrapper">
                        <ul>
                            <li class="nav-up" (click)="prev()"><a >
                                <i class="material-icons">keyboard_arrow_up</i></a>
                            </li>
                            <li class="nav-down" (click)="next()"><a >
                                <i class="material-icons">keyboard_arrow_down</i></a>
                            </li>
                            <li class="nav-expand" (click)="minimize()"><a >
                                <i class="material-icons">arrow_forward</i></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>
        
    <div class="section col" id="screen-sidebar-small"
        *ngIf="hasSmallControlls">
        <div class="row dark">
            <div class="main">
                <div *ngFor="#cuePoint of cuePoints" class="SmallCue" 
                    (click)="jumpToCue(cuePoint)"
                    style="top:{{cuePoint.startTime / api?.duration * 100}}%">
                    <span>
                        {{cuePoint.title}}
                    </span>
                </div>
                
                <div class="SmallCue red" 
                    style="top:{{(api?.time?.current / (api?.duration * 10))}}%">
                </div>
            </div>
                
            <div class="down">
                <nav class="transparent">
                    <div class="nav-wrapper">
                        <ul>
                            <li class="nav-up" (click)="prev()"><a>
                                <i class="material-icons">keyboard_arrow_up</i></a>
                            </li>
                            <li class="nav-down" (click)="next()"><a >
                                <i class="material-icons">keyboard_arrow_down</i></a>
                            </li>
                            <li class="nav-expand" (click)="maximize()"><a >
                                <i class="material-icons">arrow_back</i></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>
             
  `
})

export class VideoComponent implements OnInit {

    @Input('track') track: string;
    @Input('source') source: string;
    @Input('titel') titel: string;

    api: VgAPI;
    elem: HTMLElement;
    sources: Array<Object>;
    cuePointData: Object = {};
    cuePoints: Cue[];
    avtivCue: Cue = new Cue();
    activCueIndex: number = 0;

    hasSmallControlls: boolean = true;

    controls: boolean = false;
    autoplay: boolean = false;
    loop: boolean = false;
    preload: string = 'auto';
    fsAPI: VgFullscreenAPI;

    constructor() {
        this.fsAPI = VgFullscreenAPI;
    }

    onPlayerReady(api: VgAPI) {
        this.api = api;
        //console.log(this.api.duration);
    }

    jumpToStartPoint() {
        // console.log("jumpToStartPoint");
        var start: number = localStorage.getItem("timeToStart:" + this.source);

        if (start > 0 ) {
            let clue = this.cuePoints[start];
            //console.log(clue);
            this.jumpToCue(clue);
        }
    }


    ngOnInit(): any {
        return undefined;
    }

    onEnterCuePoint($event) {
        this.cuePointData = JSON.parse($event.text);

        this.activCueIndex = indexOfId(this.cuePoints, $event.id);
        this.avtivCue = this.cuePoints[this.activCueIndex];

        // console.log(this.activCueIndex);
        this.saveCurrentTime();

    }

    onExitCuePoint($event) {
        this.cuePointData = {};
    }

    onLoadCompleteCuePoints($event) {
        this.cuePoints = $event;
        // console.log(this.cuePoints);

        this.jumpToStartPoint();
    }

    jumpToCue(cue: Cue) {
        console.log(cue);
        this.avtivCue = cue;
        this.seekToTime(cue.startTime);
    }

    seekToTime(time: number) {
        this.api.currentTime = time;

        this.saveCurrentTime();
    }

    next() {
        console.log("next");
        if (this.activCueIndex < this.cuePoints.length - 1) {
            this.activCueIndex++;
            this.avtivCue = this.cuePoints[this.activCueIndex];

            this.seekToTime(this.avtivCue.startTime);
        }
    }

    prev() {
        console.log("next");
        if (this.activCueIndex > 0) {
            this.activCueIndex--;
            this.avtivCue = this.cuePoints[this.activCueIndex];

            this.seekToTime(this.avtivCue.startTime);
        }
    }

    minimize() {
        this.hasSmallControlls = true;
    }

    maximize() {
        this.hasSmallControlls = false;
    }

    private saveCurrentTime() {
        // console.log("saveCurrentTime", this.activCueIndex);
        localStorage.setItem("timeToStart:" + this.source, <string>(this.activCueIndex));
    }
}
