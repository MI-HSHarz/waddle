import {Component, OnInit, Input, Pipe, Inject, ViewChild} from '@angular/core';
import {Cue} from "../../util/model";
import {indexOfId} from "../../util/comon";
import {VgAPI} from "../../videogular/core/services/vg-api";
import {VgFullscreenAPI} from "../../videogular/core/services/vg-fullscreen-api";


class CueData {
    cuePoints: Cue[];
    avtivCue: Cue = new Cue();
    activCueIndex: number = 0;
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
    apiIntro: VgAPI;

    fsAPI: VgFullscreenAPI;

    videoURL: string = "";

    hasSmallControlls: boolean = true;
    introVideosEnabled: boolean = false;

    introIsPlaying: boolean = false;

    hasMeta: boolean = true;
    isMeta: boolean = false;

    isBezug: boolean = false;
    hasKriterienClips: boolean = true;

    interval;
    currentTime: number = 0;

    cueData: CueData = new CueData();
    cueDataMeta: CueData = new CueData();


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
        if ( introVideosEnabledLocalStorageValue !== null && introVideosEnabledLocalStorageValue !== undefined ) {
            this.introVideosEnabled = introVideosEnabledLocalStorageValue.startsWith("t");
        }

        return undefined;
    }


    onPlayerReady(api: VgAPI) {
        this.api = api;
        // console.log("onPlayerReady");
        // console.log(api);
    }

    onIntroPlayerReady(api: VgAPI) {
        this.apiIntro = api;
        // console.log("onIntroPlayerReady");
        // console.log(api);
        this.apiIntro.getDefaultMedia().subscriptions.ended.subscribe(() => {
                // Set the video to the beginning
                this.stopShowIntro()
            }
        );
    }


    onWindowLoadOrResize(event: MyEvent): void {
        console.log("onWindowLoadOrResize");

        var myDiv = document.getElementById('videoBox');

        if ( myDiv !== null && myDiv !== undefined ) {
            //console.log(myDiv);

            myDiv.style.height = (event.target.innerHeight - 108 - 64 - 20) + "px";
            //myDiv.style.width = myDiv.style.height ;

            console.log("width:" + event.target.innerWidth);
            console.log("height:" + event.target.innerHeight);
        }
    }

    minimize() {
        this.hasSmallControlls = true;
        localStorage.setItem("hasSmallControlls", this.hasSmallControlls.toString());
        this.isMeta = false;
    }

    maximize() {
        this.hasSmallControlls = false;
        localStorage.setItem("hasSmallControlls", this.hasSmallControlls.toString());
    }

    /*
     * Cues
     */
    onLoadCompleteCuePoints($event) {
        this.cueData.cuePoints = $event;

        if ( this.cueData.cuePoints[0] !== null ) {
            if ( this.cueData.cuePoints[0].kriterienclip === "" ) {
                this.hasKriterienClips = false;
            }
        }
    }

    onLoadCompleteMetaCuePoints($event) {

        this.cueDataMeta.cuePoints = $event;
    }

    onEnterCuePoint($event) {
        console.log("onEnterCuePoint");


        this.cueData.activCueIndex = indexOfId(this.cueData.cuePoints, $event.id);
        this.cueData.avtivCue = this.cueData.cuePoints[this.cueData.activCueIndex];


        if ( !this.isMeta ) {
            console.log("this.isMeta " + this.isMeta);
            console.log($event);
            this.playIntro(this.cueData.avtivCue)
        }
    }

    onExitCuePoint($event) {
    }

    //Meta cues
    onEnterMetaCuePoint($event) {
        console.log("onEnterMetaCuePoint");

        this.cueDataMeta.activCueIndex = indexOfId(this.cueDataMeta.cuePoints, $event.id);
        this.cueDataMeta.avtivCue = this.cueDataMeta.cuePoints[this.cueDataMeta.activCueIndex];

        if ( this.isMeta ) {
            console.log("this.isMeta " + this.isMeta);
            console.log($event);
            this.playIntro(this.cueDataMeta.avtivCue)
        }
    }

    onExitMetaCuePoint($event) {}


    jumpToCue(cue: Cue) {
        //console.log(cue);

        if ( !this.isMeta ) {
            this.cueData.avtivCue = cue;
        } else {
            this.cueData.avtivCue = cue;
        }

        this.seekToTime(cue.startTime);

        this.stopShowIntro();

        // this.playIntro(cue);
    }


    seekToTime(time: number) {
        console.log("seekToTime " + time);
        this.api.currentTime = time;
    }

    next() {
        if ( this.isMeta ) {
            if ( this.cueDataMeta.activCueIndex < this.cueDataMeta.cuePoints.length - 1 ) {
                this.cueDataMeta.activCueIndex++;
                this.cueDataMeta.avtivCue = this.cueDataMeta.cuePoints[this.cueDataMeta.activCueIndex];

                this.jumpToCue(this.cueDataMeta.avtivCue);
            }
        } else {
            if ( this.cueData.activCueIndex < this.cueData.cuePoints.length - 1 ) {
                this.cueData.activCueIndex++;
                this.cueData.avtivCue = this.cueData.cuePoints[this.cueData.activCueIndex];

                this.jumpToCue(this.cueData.avtivCue);
            }
        }

    }

    prev() {
        // console.log("metaActivCueIndex " + this.metaActivCueIndex);
        if ( this.isMeta ) {
            if ( this.cueDataMeta.activCueIndex > 0 ) {
                this.cueDataMeta.activCueIndex--;
                this.cueDataMeta.avtivCue = this.cueDataMeta.cuePoints[this.cueDataMeta.activCueIndex];

                this.jumpToCue(this.cueDataMeta.avtivCue);
            }
        } else {
            if ( this.cueData.activCueIndex > 0 ) {
                this.cueData.activCueIndex--;
                this.cueData.avtivCue = this.cueData.cuePoints[this.cueData.activCueIndex];

                this.jumpToCue(this.cueData.avtivCue);
            }
        }

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
        console.log(cue);

        if ( this.introVideosEnabled ) {

            this.api.pause();
            this.videoURL = cue.kriterienclip;
            // console.log(this.videoURL);

            this.introIsPlaying = true;
        }
    }

    stopShowIntro() {
        this.api.play();
        this.introIsPlaying = false;
    }


}

interface MyEventTarget extends EventTarget {
    innerHeight: number;
    innerWidth: number;
}

interface MyEvent extends Event {
    target: MyEventTarget;
}
