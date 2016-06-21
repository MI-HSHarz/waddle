import {Component} from "angular2/core";
import {UriEncodePipe} from "../pipes/uriEncode.pipe";
import {Content} from "../services/model";
import {ContentloaderService} from "../services/contentloader.service";

@Component({
    selector: 'module',
    directives: [],
    pipes: [
        UriEncodePipe
    ],
    template: `
        <div class="container grey darken-2">
            <div class="section">
                <div class="row">
               
                    <div *ngFor="#page of content.pages"
                        class="col s12 m6 teal white-text card module half">
                           
                        <div class="card-image waves-effect waves-block waves-light">
                            <img class="activator" src="{{page.img}}">
                        </div>
                        <div class="card-content">
                            <span class="card-title activator">{{page.menuName}}</span>
                            <a  class="white-text">
                                <i class="material-icons right">
                                    info
                                </i>
                            </a>
                        </div>
                        <div class="card-reveal">
                            <span class="card-title">
                                {{page.menuName}}
                                <i class="material-icons right">
                                    close
                                </i>
                            </span>
                            
                            <ul class="navigation-list">
                                <li *ngFor="#subpage of page.subPages">
                                    <a  href="#/page/{{subpage.$href | uriEncode}}" class="white-text">
                                        {{subpage.menuName}} 
                                    </a>
                                    <a  href="#/page/{{subpage.$href | uriEncode}}" class="white-text">
                                        <a  href="data/pdf/test.pdf">
                                            <i class="material-icons right">
                                                work
                                            </i>
                                        </a>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
 `
})


export class ModuleComponent {

    content: Content = new Content();

    constructor(private _contentloaderService: ContentloaderService) {

        this._contentloaderService.contentSubject.subscribe(content => {
            this.content = content;
        });
    }
}
