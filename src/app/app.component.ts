import {Component, ChangeDetectorRef} from '@angular/core';
import {ContentloaderService} from "./services/contentloader.service";
import {Content} from "./util/model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  content: Content = new Content();
  titel: string = "";
  mudulNumber: number = 0;

  constructor(private _contentloaderService: ContentloaderService,
              private _cdr: ChangeDetectorRef) {

    this._contentloaderService.contentSubject.subscribe(content => {
      this.content = content;

      this._contentloaderService.modulTitelSubject.subscribe(titel => {

        this.titel = titel;
        setTimeout(() => this._cdr.reattach());
      });

      this._contentloaderService.modulNumberSubject.subscribe(number => {

        this.mudulNumber = number;
        setTimeout(() => this._cdr.reattach());
      });

    });


    //Videoabspielamarken löschen
    for (var key in localStorage) {
      // console.log(key);

      if ( key.startsWith("timeToStart")) {
        localStorage.removeItem(key);
      }
    }
  }

  start() {
    this.titel = "";
  }
}
