import { Directive, Output, Input, EventEmitter, ElementRef, OnInit } from "@angular/core";
import {VgEvents} from '../events/vg-events';
import {Observable} from 'rxjs/Rx';
import {Cue} from "../../../util/model";

@Directive({
    selector: '[vgCuePoints]'
})
export class VgCuePoints implements OnInit {
    @Output('onEnterCuePoint') onEnterCuePoint:EventEmitter<any> = new EventEmitter();
    @Output('onUpdateCuePoint') onUpdateCuePoint:EventEmitter<any> = new EventEmitter();
    @Output('onExitCuePoint') onExitCuePoint:EventEmitter<any> = new EventEmitter();
    @Output('onCompleteCuePoint') onCompleteCuePoint:EventEmitter<any> = new EventEmitter();

    @Output('onLoadCompleteCuePoints') onLoadCompleteCuePoints: EventEmitter<any> = new EventEmitter();

    cues;
    cuePoints: Cue[] = [];


    constructor(public ref:ElementRef) {

    }

    ngOnInit() {
        let onLoad = Observable.fromEvent(this.ref.nativeElement, VgEvents.VG_LOAD);
        onLoad.subscribe(this.onLoad.bind(this));
    }

    onLoad(event:any) {
        let cues = event.target.track.cues;

        this.ref.nativeElement.cues = cues;

        for (let i=0, l=cues.length; i<l; i++) {
            let onEnter = Observable.fromEvent(cues[i], VgEvents.VG_ENTER);
            onEnter.subscribe(this.onEnter.bind(this));

            let onExit = Observable.fromEvent(cues[i], VgEvents.VG_EXIT);
            onExit.subscribe(this.onExit.bind(this));

            if (cues[i] !== undefined) {


                var cuePointData = JSON.parse(cues[i].text);

                //console.log(cuePointData);

                var cue = new  Cue();
                cue.id = cues[i].id;
                cue.startTime = cues[i].startTime;
                cue.endTime = cues[i].endTime;

                cue.title = cuePointData.title;
                cue.description = cuePointData.description;
                cue.shortDescription = cuePointData.shortDescription;
                cue.src = cuePointData.src;
                cue.href = cuePointData.href;
                cue.kriterienclip = cuePointData.kriterienclip;

                cue.duration = cue.endTime - cue.startTime;


                this.cuePoints.push(cue);
            }

        }
        this.onLoadCompleteCuePoints.next(this.cuePoints);
    }

    onEnter(event:any) {
        console.log("onEnter");
        console.log(event);
        this.onEnterCuePoint.next(event.target);
    }

    onExit(event:any) {
        this.onExitCuePoint.next(event.target);
    }
}
