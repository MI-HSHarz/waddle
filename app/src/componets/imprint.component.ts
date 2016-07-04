import {Component, OnInit, Input} from 'angular2/core';
import {NgIf, NgFor} from "angular2/common";


@Component({
    selector: 'imprintComponent',
    directives: [
        NgFor,
        NgIf
    ],
    template: `
        <div id="imprint" class="container">
            <div id="imprint-top" class="section card module half grey darken-4 grey-text text-lighten-2">
                <div class="row">
                    <div class="col s12 white-text">
                        <h4>Impressum</h4>
                    </div>
                    <div class="col s12">
                        <h6>ISBN 978-3-00-053566-6</h6>
                    </div>
                </div>
                <div class="row">
                    <div class="col s9">
                        <h5>Autoren:</h5>
                    </div>
                    <div class="col s3">
                        <h5>Mit Beiträgen von:</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col s4">
                        <p>
                           Andreas Ziemer<br>
                           Pädagogisch-Theologisches-<br>
                           Institut der EKM / EKA<br>9
                           Klostergarten 6<br>
                           38871 Drübeck<br>
                           www.pti.ekmd-online.de
                       </p>
                    </div>
                    <div class="col s5">
                        <p>
                            Prof. Dr. Andreas Obermann (V.i.S.d.P.)<br>
                            Am Hof 1<br>
                            53113 Bonn<br>
                            www.bibor.uni-bonn.de
                        </p>
                    </div>
                     <div class="col s3">
                       <p>
                           Grube, Alexander<br>
                           Homann, Markus<br>
                           Pulver, Anja<br>
                           Vogel, Mirco<br>
                           Weidinger, Christoph
                       </p>
                    </div>
                </div>
                <div class="row">
                    <h5>Mit Beiträgen von:</h5>
                    <p>
                        Grube, Alexander | Homann, Markus | Pulver, Anja<br>
                        Vogel, Mirco | Weidinger, Christoph
                    </p>
                </div>
            </div>
            <div id="imprint-bottom" class="section card module half grey darken-3 grey-text text-lighten-2">
                <div class="row">
                     <div class="col s5">
                        <img class="responsive-img" src="data/img/imprint/hs_harz.png" alt="">
                       <p>
                           wir.....
                       </p>
                    </div>
                </div>
            </div>
        </div>
  `
})

export class ImprintComponent {

}
