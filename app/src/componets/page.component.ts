import {Component, OnInit, AfterViewInit, AfterViewChecked} from 'angular2/core';
import {NgIf, NgFor} from "angular2/common";
import {RouteParams, OnActivate, ComponentInstruction} from "angular2/router";
import {PageService} from "../services/page.service";
import {Page, ContetComponent, GalleryImage} from "../services/model";
import {VideoComponent} from "./video.component";
import {GalleryComponent} from "./gallery.component";
import {TextComponent} from "./text.component";
import {SidebarSmall} from "./sidebar-small.component";

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
        <div class="container grey darken-2 expanded" id="screen">
            <div class="section">
                <div class="row">
                    <div class="col s12">
                        <div class="card grey darken-4">
                            <div class="card-content white-text">
                                <span class="card-title"><h4>{{page.titel}}</h4></span>
                                <p class="flow-text">
                                   {{page.text}}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <videoComponet   *ngIf="showVideo"   [track]="track" [source]="source"></videoComponet>

            <galleryComponet *ngIf="showGallery" [gallery]="gallery" ></galleryComponet>

            <textComponet    *ngIf="showText"    [texts]="texts" ></textComponet>
            </div>
            <div class="section col" id="screen-sidebar-expanded">
                <div class="row dark">
                    <div class="main">
                        <ul class="sidebar-collection collapsible" data-collapsible="accordion">
                            <li class="collection-item">
                                <div class="collapsible-header">
                                    <div class="collection-image">
                                        <img src="http://placehold.it/320x180" alt="" class="responsive-img">
                                    </div>
                                    <span class="title">Title</span>
                                    <p>First Line <br>
                                     Second Line
                                     </p>
                                 </div>
                                 <div class="collapsible-body"><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec</p></div>
                            </li>
                            <li class="collection-item">
                                <div class="collapsible-header">
                                    <div class="collection-image">
                                        <img src="http://placehold.it/320x180" alt="" class="responsive-img">
                                    </div>
                                    <span class="title">Title</span>
                                    <p>First Line <br>
                                     Second Line
                                     </p>
                                 </div>
                                 <div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
                            </li>
                            <li class="collection-item">
                                <div class="collapsible-header">
                                    <div class="collection-image">
                                        <img src="http://placehold.it/320x180" alt="" class="responsive-img">
                                    </div>
                                    <span class="title">Title</span>
                                    <p>First Line <br>
                                     Second Line
                                     </p>
                                 </div>
                                 <div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
                            </li>
                            <li class="collection-item">
                                <div class="collapsible-header">
                                    <div class="collection-image">
                                        <img src="http://placehold.it/320x180" alt="" class="responsive-img">
                                    </div>
                                    <span class="title">Title</span>
                                    <p>First Line <br>
                                     Second Line
                                     </p>
                                 </div>
                                 <div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
                            </li>
                            <li class="collection-item">
                                <div class="collapsible-header">
                                    <div class="collection-image">
                                        <img src="http://placehold.it/320x180" alt="" class="responsive-img">
                                    </div>
                                    <span class="title">Title</span>
                                    <p>First Line <br>
                                     Second Line
                                     </p>
                                 </div>
                                 <div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
                            </li>
                            <li class="collection-item">
                                <div class="collapsible-header">
                                    <div class="collection-image">
                                        <img src="http://placehold.it/320x180" alt="" class="responsive-img">
                                    </div>
                                    <span class="title">Title</span>
                                    <p>First Line <br>
                                     Second Line
                                     </p>
                                 </div>
                                 <div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
                            </li>
                            <li class="collection-item">
                                <div class="collapsible-header">
                                    <div class="collection-image">
                                        <img src="http://placehold.it/320x180" alt="" class="responsive-img">
                                    </div>
                                    <span class="title">Title</span>
                                    <p>First Line <br>
                                     Second Line
                                     </p>
                                 </div>
                                 <div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
                            </li>
                            <li class="collection-item">
                                <div class="collapsible-header">
                                    <div class="collection-image">
                                        <img src="http://placehold.it/320x180" alt="" class="responsive-img">
                                    </div>
                                    <span class="title">Title</span>
                                    <p>First Line <br>
                                     Second Line
                                     </p>
                                 </div>
                                 <div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
                            </li>
                            <li class="collection-item">
                                <div class="collapsible-header">
                                    <div class="collection-image">
                                        <img src="http://placehold.it/320x180" alt="" class="responsive-img">
                                    </div>
                                    <span class="title">Title</span>
                                    <p>First Line <br>
                                     Second Line
                                     </p>
                                 </div>
                                 <div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
                            </li>
                          </ul>

                    </div>
                    <div class="down">
                        <nav class="transparent">
                            <div class="nav-wrapper">
                                <ul>
                                    <li class="nav-up"><a href="#"><i class="material-icons">keyboard_arrow_up</i></a></li>
                                    <li class="nav-down"><a href="#"><i class="material-icons">keyboard_arrow_down</i></a></li>
                                    <li class="nav-expand"><a href="#"><i class="material-icons">arrow_forward</i></a></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

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
                private _pageService: PageService) {
    }

    ngOnInit(): any {
        console.log("ngOnInit");
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

        console.log(this.page);

        return undefined;
    }

    setComponents(page: Page) {
        page.components.forEach((pageComponent: ContetComponent) => {
            if (pageComponent.video != null) {
                console.log("video");
                this.track = pageComponent.video.trackPath;
                this.source = pageComponent.video.videoPath;

                this.showVideo = true;
                
            } else if (pageComponent.gallery != null) {
                console.log("gallery");

                this.gallery = pageComponent.gallery;

                this.showGallery = true;

            } else if (pageComponent.text != null) {
                console.log("text");

                this.texts = pageComponent.text;
                this.showText = true;
            }
        });
    }

}
