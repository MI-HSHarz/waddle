import { Component, OnInit } from '@angular/core';
import {Page, ContetComponent, GalleryImage} from "../util/model";
import {ActivatedRoute, Params} from "@angular/router";
import {PageService} from "../services/page.service";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  page: Page = new Page();
  pageRef: string;

  showVideo: boolean;
  track: string;
  metaTrack: string;
  source: string;

  showGallery: boolean;
  gallery: GalleryImage[];

  showText: boolean;
  texts: string[];

  constructor(private _activatedRoute: ActivatedRoute,
              private _pageService: PageService) {}

  ngOnInit(): any {
    //console.log("ngOnInit");
    this.showVideo   = false;
    this.showGallery = false;
    this.showText    = false;

    this._activatedRoute.params.forEach((params: Params) => {
      this.pageRef = params['id'];
      console.log(this.pageRef);
    });


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

    console.log(page);

    page.components.forEach((pageComponent: ContetComponent) => {
      if (pageComponent.video != null) {
        //console.log("video");
        this.track      = pageComponent.video.trackPath;
        this.metaTrack  = pageComponent.video.metaTrackPath;
        this.source     = pageComponent.video.videoPath;

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
