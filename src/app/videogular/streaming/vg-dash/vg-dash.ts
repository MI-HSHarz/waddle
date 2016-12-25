import { Directive, ElementRef, Input, SimpleChanges, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { VgAPI } from '../../core/services/vg-api';

declare let dashjs;

@Directive({
    selector: '[vgDash]'
})
export class VgDASH implements OnInit, OnChanges, OnDestroy {
    @Input() vgDash:string;

    vgFor: string;
    target: any;
    dash:any;

    constructor(private ref:ElementRef, public API:VgAPI) {}

    ngOnInit() {
        this.API.playerReadyEvent.subscribe((api:VgAPI) => this.onPlayerReady());
    }

    onPlayerReady() {
        this.vgFor = this.ref.nativeElement.getAttribute('vgFor');
        this.target = this.API.getMediaById(this.vgFor);
        this.createPlayer();
    }

    ngOnChanges(changes:SimpleChanges) {
        if (changes['vgDash'].currentValue) {
            this.createPlayer();
        }
        else {
            this.destroyPlayer();
        }
    }

    createPlayer() {
        if (this.dash) {
            this.destroyPlayer();
        }

        // It's a DASH source
        if (this.vgDash && this.vgDash.indexOf('.mpd') > -1) {
            this.dash = dashjs.MediaPlayer().create();
            this.dash.getDebug().setLogToBrowserConsole(false);
            this.dash.initialize(this.ref.nativeElement, this.vgDash, false);
        }
        else {
            if (this.target) {
                this.target.pause();
                this.target.seekTime(0);
                this.ref.nativeElement.src = this.vgDash;
            }
        }
    }

    destroyPlayer() {
        if (this.dash) {
            this.dash.reset();
            this.dash = null;
        }
    }

    ngOnDestroy() {
        this.destroyPlayer();
    }
}
