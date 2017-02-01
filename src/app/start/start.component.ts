import {Component, OnInit} from '@angular/core';
import {Content} from "../util/model";
import {SerialNumberVerificationService} from "../services/serial-number-verification.service";
import {ContentloaderService} from "../services/contentloader.service";
import {VgAPI} from "../videogular/core/services/vg-api";
import {VgFullscreenAPI} from "../videogular/core/services/vg-fullscreen-api";
import {VgStates} from "../videogular/core/states/vg-states";

declare var $: any;

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss'],
    host: {
        '(document:keydown)': 'handleKeyboardEvents($event)'
    }
})
export class StartComponent {

    content: Content = new Content();
    api: VgAPI;
	fsAPI: VgFullscreenAPI;

	source = "public/data/video/00_Opener_linksbuendig.mp4";

    constructor(private _contentloaderService: ContentloaderService,
                private _serialNumberVerificationService: SerialNumberVerificationService) {

	    this.fsAPI = VgFullscreenAPI;

        this._contentloaderService.contentSubject.subscribe(content => {
            this.content = content;
        });

    }

    onPlayerReady(api: VgAPI) {
        this.api = api;
        console.log("api");

        console.log(this.api);
    }

    ngAfterViewInit() {
        // var element = document.getElementById('modalSerial');

        var isRegistered = localStorage.getItem("registered");
        //console.log(isRegistered);


	    if ( isRegistered === null ) {
            $('#modalSerial').openModal();
        } else {
            this.openOpener();
        }
    }

    checkSerial(serial: string) {

        if ( this._serialNumberVerificationService.check(serial) ) {
            localStorage.setItem("registered", serial);
            $('#modalSerial').closeModal();

            this.openOpener();
        }
    }

    openOpener() {
        if ( localStorage.getItem("opener") === null ) {
            $('#modalOpener').openModal();
        }
    }

    forceOpenOpener() {
            $('#modalOpener').openModal();

        this.api.currentTime = 0;

    }

    closeOpener() {
        $('#modalOpener').closeModal();
        this.api.currentTime = 0;
    }

    closeOpenerForEver() {
        this.closeOpener()
        localStorage.setItem("opener", "no");

    }

    handleKeyboardEvents(event: KeyboardEvent) {
        let key = event.which || event.keyCode;
	    // console.log(key);
        if (27 == key) {
            this.closeOpener();
        } else if (key == 32) {
	        if (this.api.state == VgStates.VG_PAUSED) {
		        this.api.play();
	        } else {
		        this.api.pause();
	        }
        }


        return true;

    }
}
