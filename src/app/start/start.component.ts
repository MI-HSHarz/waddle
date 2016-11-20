import { Component, OnInit } from '@angular/core';
import {Content} from "../util/model";
import {SerialNumberVerificationService} from "../services/serial-number-verification.service";
import {ContentloaderService} from "../services/contentloader.service";

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
    var element = document.getElementById('modalSerial');

    var isRegistered = localStorage.getItem("registered");
    //console.log(isRegistered);

    if ( isRegistered === null ) {
      //noinspection TypeScriptUnresolvedFunction
      // $('#modalSerial').openModal();
    }


  }

  checkSerial(serial: string) {

    if (this._serialNumberVerificationService.check(serial)) {
      localStorage.setItem("registered", serial);

      // $('#modalSerial').closeModal();
    }

  }

}
