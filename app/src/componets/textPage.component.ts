import {Component, OnInit, AfterViewInit, AfterViewChecked} from 'angular2/core';
import {NgIf, NgFor} from "angular2/common";
import {RouteParams, OnActivate, ComponentInstruction} from "angular2/router";
import {PageService} from "../services/page.service";
import {Page} from "../services/model";

@Component({
    selector: 'textPageComponet',
    directives: [
        NgFor,
        NgIf
    ],
    template: `
        <div class="row">
            <div class="col s9">
                <div class="card grey darken-4" style="height: 80%">
                    <div class="card-content white-text">
                        <span class="card-title"><h2>{{page.titel}}</h2></span>
                        <p class="flow-text">
                           {{page.text}}
                        </p>
                    </div>
                </div>
            </div>
        </div> 
  `
})

export class TextPageComponent implements OnInit {


    page: Page = new Page();

    constructor(private _routeParams: RouteParams,
                private _pageService: PageService) {}

    ngOnInit(): any {
        console.log(this._routeParams.get('id'));

        let page = this._pageService.getPage(this._routeParams.get('id'));
        if (page != null) {
            this.page = page;
        }

        console.log(this.page);

        return undefined;
    }

    // ngAfterViewChecked():any {
    //     let page = this._pageService.getPage(this._routeParams.get('id'));
    //
    //     if (page != null) {
    //         this.page = page;
    //     }
    //     return undefined;
    // }

}
