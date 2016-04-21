import {Component, OnInit, Input} from 'angular2/core';
import {NgIf, NgFor} from "angular2/common";
import {GalleryImage} from "../services/model";


@Component({
    selector: 'textComponet',
    directives: [
        NgFor,
        NgIf
    ],
    template: `
        <div class="row">
            <div *ngFor="#text of texts" class="col s3">
               <div class="card grey darken-4">
                    <div class="card-content white-text">
                        <p class="flow-text">
                           {{text}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
  `
})

export class TextComponent implements OnInit {

    @Input('texts') texts: string[];

    ngOnInit(): any {

        console.log("TextComponent");
    }
}
