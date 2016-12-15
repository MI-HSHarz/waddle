import {Component, OnInit, Input, Pipe, Inject, ViewChild, ElementRef} from '@angular/core';
import {VgAPI} from "../../videogular/services/vg-api";
import {Cue} from "../../util/model";
import {VgFullscreenAPI} from "../../videogular/services/vg-fullscreen-api";
import {indexOfId} from "../../util/comon";
import {DOCUMENT} from "@angular/platform-browser";
import {PageScrollInstance, PageScrollService, EasingLogic} from 'ng2-page-scroll';


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

    @ViewChild('container')
    container: ElementRef;

    api: VgAPI;
    elem: HTMLElement;

    cuePointData: Object = {};
    cuePoints: Cue[];
    avtivCue: Cue = new Cue();
    activCueIndex: number = 0;

    metaCuePointData: Object = {};
    metaCuePoints: Cue[];
    metaAvtivCue: Cue = new Cue();
    metaActivCueIndex: number = 0;

    hasSmallControlls: boolean = true;
    //hasIntroVideo: boolean = true;
    introVideosEnabled: boolean = false;
    introVideoIsPlaying: boolean = false;

    //secong Player stuff
    secondPlayerApi: VgAPI;
    secondPlayerSource: string = "";

    controls: boolean = false;
    autoplay: boolean = false;
    loop: boolean = false;
    preload: string = 'auto';
    fsAPI: VgFullscreenAPI;

    isMeta: boolean = false;
    hasMeta: boolean = true;

    isBezug: boolean = false;

    hasKriterienClips: boolean = true;


    public constructor(@Inject(DOCUMENT) private document: any,
                       private pageScrollService: PageScrollService) {
        this.fsAPI = VgFullscreenAPI;

    }

    onPlayerReady(api: VgAPI) {
        this.api = api;
        //console.log(this.api.duration);
    }

    onSecondPlayerReady(api: VgAPI) {
        this.secondPlayerApi = api;
        this.secondPlayerApi.play();
    }

    jumpToStartPoint() {
        // console.log("jumpToStartPoint");
        var start: number = +localStorage.getItem("timeToStart:" + this.source);

        if ( start > 0 ) {
            let clue = this.cuePoints[start];
            //console.log(clue);
            this.jumpToCue(clue);
        }
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

        window.onresize = this.onWindowLoadOrResize;


        var hasSmallControllsLocalStorageValue = localStorage.getItem("hasSmallControlls");
        if ( hasSmallControllsLocalStorageValue !== null && hasSmallControllsLocalStorageValue !== undefined ) {
            this.hasSmallControlls = hasSmallControllsLocalStorageValue.startsWith("t");
        }

        // var introVideosEnabledLocalStorageValue = localStorage.getItem("introVideosEnabled");
        // if (introVideosEnabledLocalStorageValue !== null && introVideosEnabledLocalStorageValue !== undefined) {
        //     this.introVideosEnabled = introVideosEnabledLocalStorageValue.startsWith("t");
        // }

        return undefined;
    }

    ngAfterViewInit() {
        this.onWindowLoadOrResize();
    }

    onWindowLoadOrResize() {
        //console.log("onWindowLoadOrResize");
        //console.log(event);

        var myDiv = document.getElementById('videoBox');

        if ( myDiv !== null && myDiv !== undefined ) {
            //console.log(myDiv);

            //myDiv.style.height = (event.target.innerHeight  - 108 - 64 - 20) + "";
            //myDiv.style.width = myDiv.style.height ;


            //noinspection TypeScriptUnresolvedVariable
            //console.log("width:" + event.target.innerWidth);
            //noinspection TypeScriptUnresolvedVariable
            //console.log("height:" + event.target.innerHeight);
        }

    }

    //cues

    onEnterCuePoint($event) {

        //console.log("onEnterCuePoint -> introVideosEnabled:" + this.introVideosEnabled);

        this.cuePointData = JSON.parse($event.text);

        this.activCueIndex = indexOfId(this.cuePoints, $event.id);
        this.avtivCue = this.cuePoints[this.activCueIndex];

        if ( !this.isMeta ) {
            this.saveCurrentTime();
        }

        if ( this.introVideosEnabled ) {

            //console.log("introVideoIsPlaying");
            this.api.pause();
            this.introVideoIsPlaying = true;


            this.secondPlayerSource = this.avtivCue.kriterienclip;
        }

    }

    onExitCuePoint($event) {
        this.cuePointData = {};
    }

    onLoadCompleteCuePoints($event) {
        this.cuePoints = $event;
        // console.log(this.cuePoints);

        if ( this.cuePoints[0] !== null ) {
            if ( this.cuePoints[0].kriterienclip === "" ) {
                this.hasKriterienClips = false;
            }
        }

        this.jumpToStartPoint();
    }

    //Meta cues

    onEnterMetaCuePoint($event) {

        //console.log("onEnterCuePoint -> introVideosEnabled:" + this.introVideosEnabled);

        this.metaCuePointData = JSON.parse($event.text);

        this.metaActivCueIndex = indexOfId(this.metaCuePoints, $event.id);
        this.metaAvtivCue = this.metaCuePoints[this.metaActivCueIndex];

        if ( this.isMeta ) {
            this.saveCurrentTime();
        }


        if ( this.introVideosEnabled ) {

            //console.log("introVideoIsPlaying");
            this.api.pause();
            this.introVideoIsPlaying = true;

            this.secondPlayerSource = this.metaAvtivCue.kriterienclip;

        }
    }

    onExitMetaCuePoint($event) {
        this.metaCuePointData = {};
    }

    onLoadCompleteMetaCuePoints($event) {


        console.log($event);
        this.metaCuePoints = $event;
        // console.log(this.cuePoints);


        this.jumpToStartPoint();
    }


    jumpToCue(cue: Cue) {
        //console.log(cue);

        if ( !this.isMeta ) {
            this.avtivCue = cue;
        } else {
            this.metaAvtivCue = cue;
        }

        this.seekToTime(cue.startTime);

        this.introVideoIsPlaying = false;

        this.scrollToCue(cue.id)
    }

    scrollToCue(cueId:string) {
        // console.log("scrollToCue" + cueId);
        //
        // let id = '#cuePoint' +cueId;
        //
        // // console.log(id);
        // // console.log(this.container.nativeElement);
        //
        // let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document,  id, this.container.nativeElement );
        // this.pageScrollService.start(pageScrollInstance);
    }

    seekToTime(time: number) {
        this.api.currentTime = time;

        this.saveCurrentTime();
    }

    next() {


        if ( this.activCueIndex < this.cuePoints.length - 1 ) {
            this.activCueIndex++;
            this.avtivCue = this.cuePoints[this.activCueIndex];


            this.jumpToCue(this.avtivCue);

            // var element = document.getElementById('cuePoint'+ this.avtivCue.id);
            //
            // console.log(element);
            //
            // if (element !==  null) {
            //    element.scrollIntoView({block: "start"});
            // }


            //this.seekToTime(this.avtivCue.startTime);
        }
    }

    prev() {

        if ( this.activCueIndex > 0 ) {
            this.activCueIndex--;
            this.avtivCue = this.cuePoints[this.activCueIndex];

            this.jumpToCue(this.avtivCue);

            //this.seekToTime(this.avtivCue.startTime);
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

    introVideosEnable() {
        this.introVideosEnabled = true;
        localStorage.setItem("introVideosEnabled", this.introVideosEnabled.toString());

    }

    introVideosDisable() {

        this.introVideosEnabled = false;

        this.introVideoIsPlaying = false;

        this.api.play();

        localStorage.setItem("introVideosEnabled", this.introVideosEnabled.toString());
    }

    onVideoOverlayFinish($event) {
        this.introVideoIsPlaying = false;
        this.api.play();
    }

    private saveCurrentTime() {
        // console.log("saveCurrentTime", this.activCueIndex);
        localStorage.setItem("timeToStart:" + this.source, (this.activCueIndex) + "");
    }

}


