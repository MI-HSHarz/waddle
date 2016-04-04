import {Component, OnInit} from 'angular2/core';
import {NgIf, NgFor} from "angular2/common";
import {RouteParams} from "angular2/router";

@Component({
    selector: 'textPageComponet',
    directives: [
        NgFor,
        NgIf
    ],
    template: `
        <div class="row">
            <div class="col s9">
                <div class="card blue-grey darken-1" style="height: 80%">
                    <div class="card-content white-text">
                        <span class="card-title">überschrift</span>
                        Text
                    </div>
                </div>
            </div>
        </div>
  `
})

export class TextoPageComponent {



    constructor(private _routeParams: RouteParams) {

        console.log(this._routeParams.get('id'));

    }

}
