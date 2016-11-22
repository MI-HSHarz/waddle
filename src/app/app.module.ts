import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ImprintComponent} from './imprint/imprint.component';
import {StartComponent} from './start/start.component';
import {SerialNumberVerificationService} from "./services/serial-number-verification.service";
import {PageService} from "./services/page.service";
import {ContentloaderService} from "./services/contentloader.service";
import {BrowserModule} from "@angular/platform-browser";
import {VgControlsModule} from "./videogular/controls";
import {VgCore} from "./videogular/core";
import {VgOverlayPlayModule} from './videogular/overlay-play';

import {FormsModule} from "@angular/forms";
import { CardsComponent } from './cards/cards.component';
import {RoundPipe} from "./pipes/round.pipe";
import {UriEncodePipe} from "./pipes/uriEncode.pipe";
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import {PdfViewComponent} from "./pdf-view/pdf-view.component";
import {PageComponent} from "./page/page.component";

import { VideoPageComponent } from './page/video-page/video-page.component';
import { VideoOverlayComponent } from './page/video-page/video-overlay/video-overlay.component';
import {VgBufferingModule} from "./videogular/buffering";
import { OpenerComponent } from './opener/opener.component';

@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        VgCore,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule
    ],
    declarations: [
        AppComponent,
        ImprintComponent,
        StartComponent,
        CardsComponent,
        UriEncodePipe,
        RoundPipe,
        PdfViewerComponent,
        PdfViewComponent,
        PageComponent,
        VideoPageComponent,
        VideoOverlayComponent,
        OpenerComponent,
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
