import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import {ImprintComponent} from "./components/imprint/imprint.component";
import {StartComponent} from "./start/start.component";
import {CardsComponent} from "./components/cards/cards.component";
import {PdfViewComponent} from "./components/pdf-view/pdf-view.component";
import {PageComponent} from "./components/page/page.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full',
  },
  {
    path: 'start',
    component: StartComponent,
  },
  {
    path: 'imprint',
    component: ImprintComponent,
  },
  {
    path: 'cards/:id',
    component: CardsComponent,
  },
  {
    path: 'page/:id',
    component: PageComponent,
  },
  {
    path: 'pdf/:id',
    component: PdfViewComponent,
  },
];


@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot( routes, { useHash: true } ),
  ],
  providers: [
      ],
  declarations: [
      ],
  exports: [
    RouterModule
  ],
})

export class AppRoutingModule {}
