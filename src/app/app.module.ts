import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ImprintComponent} from './components/imprint/imprint.component';
import {StartComponent} from './start/start.component';
import {SerialNumberVerificationService} from "./services/serial-number-verification.service";
import {PageService} from "./services/page.service";
import {ContentloaderService} from "./services/contentloader.service";
import {BrowserModule} from "@angular/platform-browser";

import {FormsModule} from "@angular/forms";
import { CardsComponent } from './components/cards/cards.component';
import {RoundPipe} from "./pipes/round.pipe";
import {UriEncodePipe} from "./pipes/uriEncode.pipe";

import { PdfViewerComponent } from 'ng2-pdf-viewer';
import {PdfViewComponent} from "./components/pdf-view/pdf-view.component";
import {PageComponent} from "./components/page/page.component";

import { VideoPageComponent } from './components/video-page/video-page.component';
import { OpenerComponent } from './components/opener/opener.component';
import {Ng2PageScrollModule} from 'ng2-page-scroll/ng2-page-scroll';
import {ReplacePipe} from "./pipes/replace.pipe";
import {VgCoreModule} from "./videogular/core/core";
import {VgOverlayPlayModule} from "./videogular/overlay-play/overlay-play";
import {VgControlsModule} from "./videogular/controls/controls";
import {VgBufferingModule} from "./videogular/buffering/buffering";


@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        VgCoreModule,
        VgOverlayPlayModule,
        VgControlsModule,
        VgBufferingModule,

        Ng2PageScrollModule.forRoot()
    ],
    declarations: [
        AppComponent,
        ImprintComponent,
        StartComponent,
        CardsComponent,
        UriEncodePipe,
        RoundPipe,
        ReplacePipe,
        PdfViewerComponent,
        PdfViewComponent,
        PageComponent,
        VideoPageComponent,
        OpenerComponent
    ],
    providers: [
        ContentloaderService,
        PageService,
        SerialNumberVerificationService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
