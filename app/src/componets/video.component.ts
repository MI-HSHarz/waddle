import {Component, OnInit, Input} from 'angular2/core';
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
        <div class="row">
            <div class="col s12 m12 l12">
                <div class='box ratio16_9'>
                    <div class='content'>

                        <vg-player (onPlayerReady)="onPlayerReady($event)">
                        	<!--<vg-overlay-play></vg-overlay-play>-->

                        	<vg-controls  [autohide]="true" [autohideTime]="1.5">
                        		<vg-play-pause></vg-play-pause>
                        		<!--<vg-playback-button></vg-playback-button>-->

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
        
        <div class="section col" id="screen-sidebar-expanded">
            <div class="row dark">
                <div class="main">
                    <ul class="sidebar-collection collapsible" data-collapsible="accordion">
                    
                        <li *ngFor="#cuePoint of cuePoints" class="collection-item">
                            <div class="collapsible-header">
                                <div class="collection-image">
                                    <img src="http://placehold.it/320x180" alt="" class="responsive-img">
                                </div>
                                <span class="title">{{cuePoint.id}}</span>
                                <p>{{cuePoint.startTime}}<br>
                                 Dauer: {{cuePoint.duration | round}} sec
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
                                <li class="nav-up"><a ><i class="material-icons">keyboard_arrow_up</i></a></li>
                                <li class="nav-down"><a ><i class="material-icons">keyboard_arrow_down</i></a></li>
                                <li class="nav-expand"><a ><i class="material-icons">arrow_forward</i></a></li>
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

    api: VgAPI;
    sources: Array<Object>;
    cuePointData: Object = {};
    cuePoints: Cue[];

    controls: boolean = false;
    autoplay: boolean = false;
    loop: boolean = false;
    preload: string = 'auto';
    fsAPI: VgFullscreenAPI;

    constructor() {
        this.fsAPI = VgFullscreenAPI;

        this.sources = [
            {
                src: "http://static.videogular.com/assets/videos/videogular.mp4",
                type: "video/mp4"
            },
            {
                src: "http://static.videogular.com/assets/videos/videogular.ogg",
                type: "video/ogg"
            },
            {
                src: "http://static.videogular.com/assets/videos/videogular.webm",
                type: "video/webm"
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
        // console.log(this.cuePoints);
    }

    seekToTime(time: number) {
        console.log(time);
        console.log(this.api);
        this.api.currentTime = time;
    }
}
