import {Component} from "angular2/core";
import {ContentloaderService} from "../services/contentloader.service";
import {Content} from "../services/model";
@Component({
    selector: 'start',
    directives: [
    ],
    template: `
        <div class="container grey darken-4">
            <div class="section">
                <div id="index-page-section-top" class="row card module half bibor-blue">
                    <div class="col s6 offset-s1 white-text">
                        <h1 class="title">Religionsunterricht</h1>
                        <h4 class="sub-title">an der gewerblichen Berufsschule</h4>
                    </div>
                </div>
                <div id="index-page-section-bottom" class="row card module half grey darken-4">
                    <div class="col s6 offset-s1">
                        <div class="white-text">
                                <ul class="navigation-list">
                                    <li>
                                       Modul1
                                    </li>
                                     <li>
                                       <a href="#/module">Modul2</a>
                                    </li>
                                </ul>
                        </div>
                </div>
                <img class="bibor_splash2" src="data/img/bibor_splash2.png" alt="">
                </div>
            </div>
        </div>
 `
})


export class StartComponent {

    content: Content = new Content();

    constructor(private _contentloaderService: ContentloaderService) {

        this._contentloaderService.contentSubject.subscribe(content => {
            this.content = content;
        });
    }
}
