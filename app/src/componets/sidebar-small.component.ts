import {Component} from "angular2/core";
@Component({
    selector: 'sidebarSmall',
    directives: [
    ],
    template: `
         <div class="section col" id="screen-sidebar-small">
                <div class="row dark">
                    <div class="main">

                    </div>
                    <div class="down">
                        <nav class="transparent">
                            <div class="nav-wrapper">
                                <ul>
                                    <li class="nav-up"><a href="sass.html"><i class="material-icons">keyboard_arrow_up</i></a></li>
                                    <li class="nav-down"><a href="badges.html"><i class="material-icons">keyboard_arrow_down</i></a></li>
                                    <li class="nav-expand"><a href="badges.html"><i class="material-icons">arrow_back</i></a></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
 `
})


export class ModuleComponent {

}
