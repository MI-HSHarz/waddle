import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {VgSlides} from './vg-slides/vg-slides';
import {SlideModel} from './vg-slides/slide-model';

export * from './vg-slides/slide-model';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ VgSlides ],
    providers: [ SlideModel ],
    exports: [ VgSlides ]
})
export class VgSlidesModule {}
