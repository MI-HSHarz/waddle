import { Component, Input, ElementRef, HostListener, OnInit } from '@angular/core';

import {VgAPI} from '../../core/services/vg-api';


@Component({
    selector: 'vg-mute',
    template:
        `<div class="icon"
             [class.vg-icon-volume_up]="getVolume() >= 0.75"
             [class.vg-icon-volume_down]="getVolume() >= 0.25 && getVolume() < 0.75"
             [class.vg-icon-volume_mute]="getVolume() > 0 && getVolume() < 0.25"
             [class.vg-icon-volume_off]="getVolume() === 0">
        </div>`,
    styles: [`
        :host {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            display: flex;
            justify-content: center;
            height: 50px;
            width: 50px;
            cursor: pointer;
            color: white;
            line-height: 50px;
        }

        :host .icon {
            pointer-events: none;
        }
    `]
})
export class VgMute implements OnInit {
    @Input() vgFor: string;
    elem:HTMLElement;
    target: any;

    currentVolume:number;

    constructor(ref:ElementRef, public API:VgAPI) {
        this.elem = ref.nativeElement;
    }

    ngOnInit() {
        this.API.playerReadyEvent.subscribe(() => this.onPlayerReady());
    }

    onPlayerReady() {
        this.target = this.API.getMediaById(this.vgFor);
        this.currentVolume = this.target.volume;
    }

    @HostListener('click')
    onClick() {
        let volume = this.getVolume();

        if (volume === 0) {
            this.target.volume = this.currentVolume;
        }
        else {
            this.currentVolume = volume;
            this.target.volume = 0;
        }
    }

    getVolume() {
        return this.target ? this.target.volume : 0;
    }
}
