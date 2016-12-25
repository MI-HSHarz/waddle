import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pdf-view',
  templateUrl: 'pdf-view.component.html'
})
export class PdfViewComponent implements OnInit {
  pdfSrc: string;
  page: number = 1;

  constructor(private _activatedRoute: ActivatedRoute) {

    this._activatedRoute.params.forEach((params: Params) => {
      this.pdfSrc = params['id'];
      console.log(this.pdfSrc);
    });

  }

  ngOnInit() {
  }

}
