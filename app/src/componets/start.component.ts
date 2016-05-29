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
                <div class="row">
                    <div class="col s12 m6 offset-m3">
                        <div class="card card-panel large grey darken-4">
                            <div class="card-content white-text">
                                <span class="card-title">
                                    Title
                                </span>
                                <!--<ul class="">-->
                                    <!--<li  *ngFor="#contentModul of content.modules">-->
                                        <!--&lt;!&ndash;<a  href="#/page/{{subpage.$href | uriEncode}}" class="white-text">&ndash;&gt;-->
                                            <!--{{contentModul.name}}-->
                                        <!--&lt;!&ndash;</a>&ndash;&gt;-->
                                    <!--</li>-->
                                <!--</ul>-->
                                
                            </div>
                            
                        </div>
                    </div>
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
