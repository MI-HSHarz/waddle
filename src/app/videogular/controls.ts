import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';


import {VgTrackSelector} from "./vg-controls/vg-track-selector/vg-track-selector";
import {VgControls} from "./vg-controls/vg-controls";
import {VgFullscreen} from "./vg-controls/vg-fullscreen/vg-fullscreen";
import {VgMute} from "./vg-controls/vg-mute/vg-mute";
import {VgVolume} from "./vg-controls/vg-volume/vg-volume";
import {VgPlayPause} from "./vg-controls/vg-play-pause/vg-play-pause";
import {VgPlaybackButton} from "./vg-controls/vg-playback-button/vg-playback-button";
import {VgScrubBar} from "./vg-controls/vg-scrub-bar/vg-scrub-bar";
import {VgScrubBarBufferingTime} from "./vg-controls/vg-scrub-bar/vg-scrub-bar-buffering-time/vg-scrub-bar-buffering-time";
import {VgScrubBarCuePoints} from "./vg-controls/vg-scrub-bar/vg-scrub-bar-cue-points/vg-scrub-bar-cue-points";
import {VgScrubBarCurrentTime} from "./vg-controls/vg-scrub-bar/vg-scrub-bar-current-time/vg-scrub-bar-current-time";
import {VgTimeDisplay} from "./vg-controls/vg-time-display/vg-time-display";

@NgModule({
    imports: [ CommonModule ],
    declarations: [
        VgControls,
        VgFullscreen,
        VgMute,
        VgVolume,
        VgPlayPause,
        VgPlaybackButton,
        VgScrubBar,
        VgScrubBarBufferingTime,
        VgScrubBarCuePoints,
        VgScrubBarCurrentTime,
        VgTimeDisplay,
        VgTrackSelector
    ],
    exports: [
        VgControls,
        VgFullscreen,
        VgMute,
        VgVolume,
        VgPlayPause,
        VgPlaybackButton,
        VgScrubBar,
        VgScrubBarBufferingTime,
        VgScrubBarCuePoints,
        VgScrubBarCurrentTime,
        VgTimeDisplay,
        VgTrackSelector
    ]
})
export class VgControlsModule {}