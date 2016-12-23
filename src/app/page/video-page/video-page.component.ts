import {Component, OnInit, Input, Pipe, Inject, ViewChild} from '@angular/core';
import {VgAPI} from "../../videogular/services/vg-api";
import {Cue} from "../../util/model";
import {VgFullscreenAPI} from "../../videogular/services/vg-fullscreen-api";
import {indexOfId} from "../../util/comon";
import {DOCUMENT} from "@angular/platform-browser";
import {isNullOrUndefined} from "util";

class CueData {
    cuePoints: Cue[];
    avtivCue: Cue = new Cue();
    activCueIndex: number = 0;
    introIsPlaying: boolean = false;
    playNextCue:boolean = true;
}

@Component({
    selector: 'videoPage',
    templateUrl: 'video-page.component.html',
    styleUrls: ['video-page.component.scss']
})
export class VideoPageComponent implements OnInit {

    @Input('track') track: string;
    @Input('metaTrack') metaTrack: string;

    @Input('source') source: string;
    @Input('title') title: string;

    api: VgAPI;
    fsAPI: VgFullscreenAPI;

    videoURL: string = "";

    cueData:CueData = new CueData();
    cueDataMeta:CueData = new CueData();

    cuePoints: Cue[];
    avtivCue: Cue = new Cue();
    activCueIndex: number = 0;

    metaCuePoints: Cue[];
    metaAvtivCue: Cue = new Cue();
    metaActivCueIndex: number = 0;

    hasSmallControlls: boolean = true;
    introVideosEnabled: boolean = false;

    isMeta: boolean = false;
    hasMeta: boolean = true;

    isBezug: boolean = false;

    hasKriterienClips: boolean = true;

    introIsPlaying: boolean = false;
    playNextCue:boolean = true;

    interval;

    currentTime:number = 0;

    public constructor() {
        this.fsAPI = VgFullscreenAPI;
    }

    ngOnInit(): any {

        console.log(this.track);
        if ( this.track === null || this.track === undefined ) {
            this.isBezug = true;
        } else if ( this.metaTrack === null || this.metaTrack === undefined ) {
            // console.log("has no Meta");
            this.hasMeta = false;
        } else {
            // console.log("hasMeta");
            this.hasMeta = true;
        }

        window.onresize = this.onWindowLoadOrResize.bind(this);
        window.dispatchEvent(new Event('resize'));


        var hasSmallControllsLocalStorageValue = localStorage.getItem("hasSmallControlls");
        if ( hasSmallControllsLocalStorageValue !== null && hasSmallControllsLocalStorageValue !== undefined ) {
            this.hasSmallControlls = hasSmallControllsLocalStorageValue.startsWith("t");
        }

        var introVideosEnabledLocalStorageValue = localStorage.getItem("introVideosEnabled");
        if (introVideosEnabledLocalStorageValue !== null && introVideosEnabledLocalStorageValue !== undefined) {
            this.introVideosEnabled = introVideosEnabledLocalStorageValue.startsWith("t");
        }

        return undefined;
    }
    ngAfterViewInit() {
    }


    onPlayerReady(api: VgAPI) {
        this.api = api;
        console.log("onPlayerReady");
        this.seekToTime(this.currentTime);
    }

    onIntroPlayerReady(){
        console.log("onIntroPlayerReady");
    }


    onWindowLoadOrResize(event: MyEvent):void {
        console.log("onWindowLoadOrResize");
        // console.log(event);

        var myDiv = document.getElementById('videoBox');

        if ( myDiv !== null && myDiv !== undefined ) {
            //console.log(myDiv);

            myDiv.style.height = (event.target.innerHeight  - 108 - 64 - 20) + "px";
            //myDiv.style.width = myDiv.style.height ;


            // noinspection TypeScriptUnresolvedVariable
            console.log("width:" + event.target.innerWidth);
            // noinspection TypeScriptUnresolvedVariable
            console.log("height:" + event.target.innerHeight);
        }

    }

    /*
     * Cues
     */

    onLoadCompleteCuePoints($event) {
        this.cuePoints = $event;
        // console.log(this.cuePoints);

        if ( this.cuePoints[0] !== null ) {
            if ( this.cuePoints[0].kriterienclip === "" ) {
                this.hasKriterienClips = false;
            }
        }
    }

    onLoadCompleteMetaCuePoints($event) {
        // console.log($event);
        this.metaCuePoints = $event;
        // console.log(this.cuePoints);
    }

    onEnterCuePoint($event) {
        console.log("onEnterCuePoint");


        this.activCueIndex = indexOfId(this.cuePoints, $event.id);
        this.avtivCue = this.cuePoints[this.activCueIndex];

        if ( !this.isMeta ) {
            console.log("playNextCue " + this.playNextCue);

            if (this.playNextCue) {
                this.playIntro(this.avtivCue)
            } else {
                this.playNextCue = true;
            }
        }
    }

    onExitCuePoint($event) {
        console.log("onEnterCuePoint");
    }

    //Meta cues
    onEnterMetaCuePoint($event) {

            console.log("onEnterMetaCuePoint");
            console.log($event);


            this.metaActivCueIndex = indexOfId(this.metaCuePoints, $event.id);
            this.metaAvtivCue = this.metaCuePoints[this.metaActivCueIndex];

            if ( this.isMeta ) {
                if ( this.playNextCue ) {
                    this.playIntro(this.metaAvtivCue)
                } else {
                    this.playNextCue = false;
                }

            }

    }

    onExitMetaCuePoint($event) {
    }



    jumpToCue(cue: Cue) {
        //console.log(cue);

        if ( !this.isMeta ) {
            this.avtivCue = cue;
        } else {
            this.metaAvtivCue = cue;
        }

        this.seekToTime(cue.startTime);

        this.playNextCue = true;

        if ( this.api !== null && this.api !== undefined ) {
            if(this.introIsPlaying){
                this.api.currentTime = 10000;
            }
        }
    }



    seekToTime(time: number) {
        console.log("seekToTime " + time);
        this.api.currentTime = time;
    }

    next() {

        if(this.isMeta){

            if ( this.metaActivCueIndex < this.metaCuePoints.length - 1 ) {
                this.metaActivCueIndex++;
                this.metaAvtivCue = this.metaCuePoints[this.metaActivCueIndex];

                this.jumpToCue(this.metaAvtivCue);
            }
        }else {
        if ( this.activCueIndex < this.cuePoints.length - 1 ) {
            this.activCueIndex++;
            this.avtivCue = this.cuePoints[this.activCueIndex];

            this.jumpToCue(this.avtivCue);
        }}

    }

    prev() {

        console.log("metaActivCueIndex " + this.metaActivCueIndex);
        if(this.isMeta){
            if ( this.metaActivCueIndex > 0 ) {
                this.metaActivCueIndex--;
                this.metaAvtivCue = this.metaCuePoints[this.metaActivCueIndex];

                this.jumpToCue(this.avtivCue);
            }
        }else{
            if ( this.activCueIndex > 0 ) {
                this.activCueIndex--;
                this.avtivCue = this.cuePoints[this.activCueIndex];

                this.jumpToCue(this.avtivCue);
            }
        }

    }


    minimize() {
        this.hasSmallControlls = true;
        localStorage.setItem("hasSmallControlls", this.hasSmallControlls.toString());
    }

    maximize() {
        this.hasSmallControlls = false;
        localStorage.setItem("hasSmallControlls", this.hasSmallControlls.toString());
    }


    /*
     * Intro stuff
     */

    enableIntroVideos() {
        this.introVideosEnabled = true;
        localStorage.setItem("introVideosEnabled", this.introVideosEnabled.toString());
    }

    disableIntroVideo() {

        this.introVideosEnabled = false;

        this.stopShowIntro();

        localStorage.setItem("introVideosEnabled", this.introVideosEnabled.toString());
    }


    private playIntro(cue: Cue) {

        // console.log("playIntro");
        // console.log(cue);

        if ( this.introVideosEnabled ) {

            this.videoURL = cue.kriterienclip;
            // console.log(this.videoURL);

            this.startShowIntro()
        }
    }

    private startShowIntro() {
        console.log("startShowIntro");

        this.introIsPlaying = true;
        this.interval = setInterval(() => this.isPlayerReady(), 200);

    }

    private stopShowIntro() {
        console.log("stopShowIntro");

        this.playNextCue = false;
        this.introIsPlaying = false;

        console.log(this.currentTime);
        this.currentTime = this.avtivCue.startTime;
    }

    private isPlayerReady() {
        if ( this.api !== null && this.api !== undefined ) {

            if ( this.api.isCompleted ) {
                clearInterval(this.interval);
                console.log("isCompleted");
                this.stopShowIntro();
            }
        }

    }

}

interface MyEventTarget extends EventTarget {
    innerHeight: number;
    innerWidth: number;
}

interface MyEvent extends Event {
    target: MyEventTarget;
}
