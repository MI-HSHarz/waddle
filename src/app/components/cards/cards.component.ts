import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute} from "@angular/router";
import {ContentloaderService} from "../../services/contentloader.service";
import {ContentModul} from "../../util/model";

@Component({
  selector: 'app-cards',
  templateUrl: 'cards.component.html',
  styleUrls: ['cards.component.scss']
})
export class CardsComponent implements OnInit {

  modul: ContentModul = new ContentModul();

  constructor(private _activatedRoute: ActivatedRoute,
              private _contentloaderService: ContentloaderService) {

    this._contentloaderService.contentSubject.subscribe(content => {

      var id = 0;
      this._activatedRoute.params.forEach((params: Params) => {
        id = +params['id'];
        console.log(id);
      });

      console.log(id);


      if (id != null) {
        let modul = content.modules[id];
        if (modul != null) {
          this.modul = modul;

          console.log(this.modul);

          this._contentloaderService.setModulTitel(this.modul.name);
          this._contentloaderService.setModulNumber(id);
        }
      }


    });

  }

  ngOnInit(): void {

  }

}
