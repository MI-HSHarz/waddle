import { Component, Input, ElementRef, OnInit } from '@angular/core';

import {VgAPI} from '../../../core/services/vg-api';

@Component({
    selector: 'vg-scrub-bar-current-time',
    template: `<div class="background" [style.width]="getPercentage()"></div>`,
    styles: [`
        :host {
            display: flex;
            width: 100%;
            height: 5px;
            pointer-events: none;
            position: absolute;
        }

        :host .background {
            background-color: white;
        }

        vg-controls :host {
            position: absolute;
            top: calc(50% - 3px);
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
        }

        vg-controls :host .background {
            border: 1px solid white;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
        }
    `]
})
export class VgScrubBarCurrentTime implements OnInit {
    @Input() vgFor: string;

    elem:HTMLElement;
    target: any;

    constructor(ref:ElementRef, public API:VgAPI) {
        this.elem = ref.nativeElement;
    }

    ngOnInit() {
        this.API.playerReadyEvent.subscribe(() => this.onPlayerReady());
    }

    onPlayerReady() {
        this.target = this.API.getMediaById(this.vgFor);
    }

    getPercentage() {
        return this.target ? ((this.target.time.current * 100) / this.target.time.total) + '%' : '0%';
    }
}
