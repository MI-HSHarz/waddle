import { Directive, ElementRef, Input, SimpleChanges, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { VgAPI } from "../../core/services/vg-api";

declare let Hls;

@Directive({
    selector: '[vgHls]'
})
export class VgHLS implements OnInit, OnChanges, OnDestroy {
    @Input() vgHls:string;

    vgFor: string;
    target: any;
    hls: any;
    preload: boolean;

    constructor(private ref:ElementRef, public API:VgAPI) {}

    ngOnInit() {
        this.API.playerReadyEvent.subscribe((api:VgAPI) => this.onPlayerReady());
    }

    onPlayerReady() {
        this.preload = this.ref.nativeElement.getAttribute('preload') !== 'none';
        this.vgFor = this.ref.nativeElement.getAttribute('vgFor');
        this.target = this.API.getMediaById(this.vgFor);
        this.createPlayer();

        if (!this.preload) {
            this.API.subscriptions.play.subscribe(
                () => {
                    if (this.hls) {
                        this.hls.startLoad(0);
                    }
                }
            );
        }
    }

    ngOnChanges(changes:SimpleChanges) {
        if (changes['vgHls'].currentValue) {
            this.createPlayer();
        }
        else {
            this.destroyPlayer();
        }
    }

    createPlayer() {
        if (this.hls) {
            this.destroyPlayer();
        }

        // It's a HLS source
        if (this.vgHls && this.vgHls.indexOf('.m3u8') > -1 && Hls.isSupported()) {
            let video:HTMLVideoElement = this.ref.nativeElement;

            this.hls = new Hls({
                autoStartLoad: this.preload
            });
            this.hls.loadSource(this.vgHls);
            this.hls.attachMedia(video);
        }
        else {
            if (this.target) {
                this.target.pause();
                this.target.seekTime(0);
                this.ref.nativeElement.src = this.vgHls;
            }
        }
    }

    destroyPlayer() {
        if (this.hls) {
            this.hls.destroy();
            this.hls = null;
        }
    }

    ngOnDestroy() {
        this.destroyPlayer();
    }
}
