
import {RoundPipe} from "../../pipes/round.pipe";
import {Component, Input} from "angular2/core";
import {Cue} from "../../services/model";

@Component({
    selector: 'videoInfoBoxComponent',
    directives: [
    ],
    pipes: [
        RoundPipe
    ],
    template: `
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
    `
})

export class VideoInfoBoxComponent {

    @Input('cuePoint') cuePoint: Cue;
    @Input('isActiv') isActiv: boolean;



}
