import {Component} from "angular2/core";
import {ContentloaderService} from "../services/contentloader.service";
import {Content} from "../services/model";
@Component({
    selector: 'start',
    directives: [
    ],
    template: `
        <div class="container grey darken-4 valign-wrapper">
            <div class="section valign">
            
            
                <img class="bibor_splash1" src="data/img/bibor_splash1.png" alt="">
                
                <div class="bibor_splash_contents">
                   
                        <div class="white-text">
                                
                                <ul class="modullist">
                                    <li >
                                       Modul1
                                    </li>
                                     <li  >
                                       <a href="#/module">Modul2</a>
                                    </li>
                                </ul>
                                
                            
                            
                        </div>
                   
                </div>
                
                <img class="bibor_splash2" src="data/img/bibor_splash2.png" alt="">
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
