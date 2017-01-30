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

	id: number = 0;
  constructor(private _activatedRoute: ActivatedRoute,
              private _contentloaderService: ContentloaderService) {

    this._contentloaderService.contentSubject.subscribe(content => {

	    this.id = 0;
      this._activatedRoute.params.forEach((params: Params) => {
	      this.id = +params['id'];
	      console.log(this.id);
      });

	    console.log(this.id);


	    if (this.id != null) {
		    let modul = content.modules[this.id];
        if (modul != null) {
          this.modul = modul;

          console.log(this.modul);

          this._contentloaderService.setModulTitel(this.modul.name);
	        this._contentloaderService.setModulNumber(this.id);
        }
      }


    });

  }

  ngOnInit(): void {

  }

}
