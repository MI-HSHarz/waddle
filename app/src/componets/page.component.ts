import {Component, OnInit} from 'angular2/core';
import {NgIf, NgFor} from "angular2/common";
import {RouteParams} from "angular2/router";
import {PageService} from "../services/page.service";
import {Page, ContetComponent, GalleryImage} from "../services/model";
import {GalleryComponent} from "./gallery.component";
import {TextComponent} from "./text.component";
import {VideoComponent} from "./video/video.component";

@Component({
    selector: 'PageComponet',
    directives: [
        NgFor,
        NgIf,
        VideoComponent,
        GalleryComponent,
        TextComponent
    ],
    template: `
        <div class="container grey darken-4 " >
            
            <videoComponet   *ngIf="showVideo"   
                [track]="track" [source]="source" [titel]="page.titel">     
            </videoComponet>

            <galleryComponet *ngIf="showGallery" [gallery]="gallery" ></galleryComponet>

            <textComponet    *ngIf="showText"    [texts]="texts" ></textComponet>
            
        </div>
  `
})

export class PageComponent implements OnInit {

    page: Page = new Page();
    pageRef: string;

    showVideo: boolean;
    track: string;
    source: string;

    showGallery: boolean;
    gallery: GalleryImage[];

    showText: boolean;
    texts: string[];

    constructor(private _routeParams: RouteParams,
                private _pageService: PageService) {}

    ngOnInit(): any {
        //console.log("ngOnInit");
        this.showVideo   = false;
        this.showGallery = false;
        this.showText    = false;

        this.pageRef = this._routeParams.get('id');

        let page = this._pageService.getPage(this.pageRef);

        /*
         * beim laden kann es passieren das der Contetn noch nicht geladen ist die seite
         * aber schon angezeit wird. In dem Fall läd die Seit ihren Inhalt einfach selbst.
         */
        if (page != null) {
            this.page = page;
            this.setComponents(this.page);
        } else {
            this._pageService.fetchPage(this.pageRef)
                .subscribe(
                    (page: Page) => {
                        this.page = page;
                        this.setComponents(this.page);
                    },
                    error => {
                        console.log(error);
                    }
                );
        }

        //console.log(this.page);

        return undefined;
    }

    setComponents(page: Page) {
        page.components.forEach((pageComponent: ContetComponent) => {
            if (pageComponent.video != null) {
                //console.log("video");
                this.track = pageComponent.video.trackPath;
                this.source = pageComponent.video.videoPath;

                this.showVideo = true;

            } else if (pageComponent.gallery != null) {
                //console.log("gallery");

                this.gallery = pageComponent.gallery;

                this.showGallery = true;

            } else if (pageComponent.text != null) {
                //console.log("text");

                this.texts = pageComponent.text;
                this.showText = true;
            }
        });
    }

}
