import {Component, OnInit} from '@angular/core';
import {Content} from "../util/model";
import {SerialNumberVerificationService} from "../services/serial-number-verification.service";
import {ContentloaderService} from "../services/contentloader.service";

declare var $: any;

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss']
})
export class StartComponent {

    content: Content = new Content();

    constructor(private _contentloaderService: ContentloaderService,
                private _serialNumberVerificationService: SerialNumberVerificationService) {


        this._contentloaderService.contentSubject.subscribe(content => {
            this.content = content;
        });

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

    }

    closeOpener() {
        $('#modalOpener').closeModal();
    }

    closeOpenerForEver() {
        this.closeOpener()
        localStorage.setItem("opener", "no");

    }
}
