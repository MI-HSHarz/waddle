import {Component, OnInit, Input} from 'angular2/core';
import {NgIf, NgFor} from "angular2/common";
import {GalleryImage} from "../services/model";


@Component({
    selector: 'galleryComponet',
    directives: [
        NgFor,
        NgIf
    ],
    template: `
        <div class="row">
            <div *ngFor="#image of gallery" class="col s3">
               <div class="card grey darken-4">
                    <div class="card-content white-text">
                        <span class="card-title">{{image.caption}}</span>
                        <p class="flow-text">
                           <img src="{{image.path}}" alt="" style="width:100%">
                        </p>
                    </div>
                </div>
            </div>
        </div>
  `
})

export class GalleryComponent implements OnInit {

    @Input('gallery') gallery: GalleryImage[];
    
    ngOnInit(): any {

        return undefined;
    }
}
