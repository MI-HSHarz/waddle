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
                    <div class="col s12">
                        <h5>Autoren:</h5>
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
                    <div class="col s4">
                        <p>
                            Prof. Dr. Andreas Obermann (V.i.S.d.P.)<br>
                            Am Hof 1<br>
                            53113 Bonn<br>
                            www.bibor.uni-bonn.de
                        </p>
                    </div>
                     <div class="col s4">
                        <img class="responsive-img right" src="data/img/bibor_splash2.png" alt="" width="250px">
                    </div>
                </div>
                <div class="row">
                    <div class="col s8">
                        <h5>Mit Beiträgen von:</h5>
                        <p>
                            Grube, Alexander | Homann, Markus | Pulver, Anja<br>
                            Vogel, Mirco | Weidinger, Christoph
                        </p>
                    </div>
                     <div class="col s4">
                       <img class="responsive-img right" src="data/img/imprint/pti_logo.png" alt="" width="80px">
                    </div>
                </div>
            </div>
            <div id="imprint-bottom" class="section card module half grey darken-3 grey-text text-lighten-2">
                <div class="row">
                     <div class="col s12">
                        <h5>Hergestellt durch:</h5>
                    </div>
                </div>
                <div class="row">
                <div class="col s4">
                        <img class="responsive-img" src="data/img/imprint/hs_harz.png" alt="" width="250px">
                    </div>
                    <div class="col s4">
                        <img class="responsive-img" src="data/img/imprint/mi_logo_white.png" alt="" width="180px">
                    </div>
                </div>
                <div class="row">
                     <div class="col s4">
                        <p>
                           Friedrichstraße 57 - 59<br>
                           38855 Wernigerode<br>
                           www.medieninformatik.de
                       </p>
                    </div>
                    <div class="col s4">
                        <p>
                            Studiengang Medieninformatik<br>
                            Prof. Martin Kreyßig<br>
                            Prof. Daniel Ackermann
                        </p>
                    </div>
                     <div class="col s4">
                        <p>
                            Müller, Phillip | Hasenbalg, Hagen<br>
                            Cramme, Jessica | Schrebe, Christian<br>
                            Dressel, Kevin | Drews, Luisa | Ritter, Robin
                        </p>
                    </div>
                </div>
            </div>
        </div>
  `
})

export class ImprintComponent {

}
