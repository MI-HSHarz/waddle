import {Component, AfterViewChecked, AfterViewInit} from "angular2/core";
import {ContentloaderService} from "../services/contentloader.service";
import {Content} from "../services/model";
@Component({
    selector: 'start',
    directives: [
    ],
    template: `
        <div class="container grey darken-4">
        
        
            <div id="modalSerial" class="modal">
                <div class="modal-content">
                    <h4>Seriennummer eingeben</h4>
                    <div class="input-field col s12">
                        
                    </div>
                </div>
                <div class="modal-footer">
                    
                    <div class="input-field">
                        <input #serial type="text" class=""type="password">
                        <label for="password">Produktschlüssel</label>
                    </div>
                    
                
                    <button class=" modal-action modal-close waves-effect btn-flat"
                        (click)="checkSerial(serial.value)">
                        
                        überprüfen
                    </button>
                </div>
            </div>
            
            
            <div class="section">
                <div id="index-page-section-top" class="row card module half bibor-blue">
                    <div class="col s12 white-text">
                        <h1 class="title">Religionsunterricht</h1>
                        <h4 class="sub-title">an der gewerblichen Berufsschule</h4>
                    </div>
                </div>
                <div id="index-page-section-bottom" class="row card module half grey darken-4">
                    <div class="col s61">
                        <div class="white-text">
                                <ul class="navigation-list">
                                    <li>
                                       <a href="#/module">Die Braxis des BRU</a>
                                    </li>
                                     <li>
                                        <a href="#/module">Berufsbezüge</a>
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


export class StartComponent implements AfterViewInit{

    content: Content = new Content();

    constructor(private _contentloaderService: ContentloaderService) {

        this._contentloaderService.contentSubject.subscribe(content => {
            this.content = content;
        });
    }

    ngAfterViewInit() {
        var element = document.getElementById('modalSerial');



        var isRegistered = localStorage.getItem("registered");
        console.log(isRegistered);

        if ( isRegistered === null ) {
            $('#modalSerial').openModal();
        }
    }

    checkSerial(serial: string) {

        localStorage.setItem("registered", serial);
        $('#modalSerial').closeModal();
    }

}
