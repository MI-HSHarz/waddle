import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {VgAPI} from "../../../videogular/services/vg-api";
import {VgFullscreenAPI} from "../../../videogular/services/vg-fullscreen-api";

@Component({
  selector: 'videoOverlay',
  templateUrl: 'video-overlay.component.html',
  styleUrls: ['video-overlay.component.scss']
})
export class VideoOverlayComponent implements OnInit {


  @Input('source') source: string;
  @Output('onVideoOverlayFinish') onVideoOverlayFinish: EventEmitter<any> = new EventEmitter();

  api: VgAPI;
  elem: HTMLElement;

  loop: boolean = false;
  preload: string = 'auto';
  fsAPI: VgFullscreenAPI;
  interval;
  opacity: number = 0;

  constructor() {

    this.fsAPI = VgFullscreenAPI;
  }

  onPlayerReady(api: VgAPI) {
    this.opacity = 1;
    this.api = api;
    //this.api.play();
    this.interval = setInterval(() => this.isPlayerReady(), 200 );
  }

  ngOnInit(): any {
    console.log("VideoOverlayComponent: " + this.source);
    return undefined;
  }

  private isPlayerReady() {
    if (this.api !== null && this.api !== undefined) {

      if ( (this.api.duration - this.api.currentTime) < 1 ) {

        this.opacity = 0;
      }

      if (this.api.isCompleted) {
        clearInterval(this.interval);
        //console.log("isCompleted");
        this.onVideoOverlayFinish.next();
      }
    }

  }

}
