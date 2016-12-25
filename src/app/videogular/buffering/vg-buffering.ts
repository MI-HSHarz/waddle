import { Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { VgAPI } from '../core/services/vg-api';
import { IPlayable } from '../core/vg-media/i-playable';
import { VgStates } from '../core/states/vg-states';

@Component({
    selector: 'vg-buffering',
    template: `<div class="vg-buffering">
            <div class="bufferingContainer">
                <div class="loadingSpinner"></div>
            </div>
        </div>`,
    styles: [ `
        :host {
            z-index: 201;
        }
        .vg-buffering {
            position: absolute;
            display: block;
            width: 100%;
            height: 100%;
        }

        .vg-buffering .bufferingContainer {
            width: 100%;
            position: absolute;
            cursor: pointer;
            top: 50%;
            margin-top: -50px;

            zoom: 1;
            filter: alpha(opacity=60);
            opacity: 0.6;
        }

        /* Loading Spinner
        * http://www.alessioatzeni.com/blog/css3-loading-animation-loop/
        */
        .vg-buffering .loadingSpinner {
            background-color: rgba(0, 0, 0, 0);
            border: 5px solid rgba(255, 255, 255, 1);
            opacity: .9;
            border-top: 5px solid rgba(0, 0, 0, 0);
            border-left: 5px solid rgba(0, 0, 0, 0);
            border-radius: 50px;
            box-shadow: 0 0 35px #FFFFFF;
            width: 50px;
            height: 50px;
            margin: 0 auto;
            -moz-animation: spin .5s infinite linear;
            -webkit-animation: spin .5s infinite linear;
        }

        .vg-buffering .loadingSpinner .stop {
            -webkit-animation-play-state: paused;
            -moz-animation-play-state: paused;
        }

        @-moz-keyframes spin {
            0% {
                -moz-transform: rotate(0deg);
            }
            100% {
                -moz-transform: rotate(360deg);
            }
        }

        @-moz-keyframes spinoff {
            0% {
                -moz-transform: rotate(0deg);
            }
            100% {
                -moz-transform: rotate(-360deg);
            }
        }

        @-webkit-keyframes spin {
            0% {
                -webkit-transform: rotate(0deg);
            }
            100% {
                -webkit-transform: rotate(360deg);
            }
        }

        @-webkit-keyframes spinoff {
            0% {
                -webkit-transform: rotate(0deg);
            }
            100% {
                -webkit-transform: rotate(-360deg);
            }
        }
    ` ]
})
export class VgBuffering implements OnInit {
    @Input() vgFor: string;

    elem: HTMLElement;
    target: IPlayable;
    checkBufferInterval: number;
    checkInterval: number = 50;
    currentPlayPos: number = 0;
    lastPlayPos: number = 0;

    @HostBinding('style.display') displayState: string = 'none';

    constructor(ref: ElementRef, public API: VgAPI) {
        this.elem = ref.nativeElement;
        API.playerReadyEvent.subscribe((api: VgAPI) => this.onPlayerReady());
    }

    ngOnInit() {
        this.API.playerReadyEvent.subscribe(() => this.onPlayerReady());
    }

    onPlayerReady() {
        this.target = this.API.getMediaById(this.vgFor);

        this.target.subscriptions.bufferDetected.subscribe(
            isBuffering => this.onUpdateBuffer(isBuffering)
        );
    }

    onUpdateBuffer(isBuffering) {
        if (isBuffering && this.target.state === VgStates.VG_PLAYING) {
            this.show();
        }
        else {
            this.hide();
        }
    }

    show() {
        this.displayState = 'block';
    }

    hide() {
        this.displayState = 'none';
    }
}
