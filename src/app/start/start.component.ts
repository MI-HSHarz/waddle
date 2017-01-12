import {Component, OnInit} from '@angular/core';
import {Content} from "../util/model";
import {SerialNumberVerificationService} from "../services/serial-number-verification.service";
import {ContentloaderService} from "../services/contentloader.service";
import {VgAPI} from "../videogular/core/services/vg-api";

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

    constructor(private _contentloaderService: ContentloaderService,
                private _serialNumberVerificationService: SerialNumberVerificationService) {


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
        console.log(key);
        if (27 == key) {
            this.closeOpener();
        }


        return true;

    }
}
