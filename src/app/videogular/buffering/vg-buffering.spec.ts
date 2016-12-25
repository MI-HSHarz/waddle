import {VgBuffering} from "./vg-buffering";
import {VgAPI} from "../core/services/vg-api";
import {IPlayable} from "../core/vg-media/i-playable";
import {ElementRef} from "@angular/core";
import { VgStates } from "../core/states/vg-states";

describe('Buffering', () => {
    let vgBuffering:VgBuffering;
    let ref:ElementRef;
    let api:VgAPI;

    beforeEach(() => {
        ref = {
            nativeElement: {
                getAttribute: (name) => {
                    return name;
                }
            }
        };

        api = new VgAPI();
        vgBuffering = new VgBuffering(ref, api);
    });

    describe('onPlayerReady', ()=>{
        it('should subscribe to bufferDetected media events', ()=>{
            spyOn(api, 'getMediaById').and.returnValue({
                subscriptions: {
                    bufferDetected: {subscribe: jasmine.createSpy('bufferDetected') }
                }
            });
            vgBuffering.onPlayerReady();
            expect(vgBuffering.target.subscriptions.bufferDetected.subscribe).toHaveBeenCalled();
        });
    });

    describe('isBuffering', ()=>{
        it('should show if buffer is detected and video is playing', () => {
            vgBuffering.target = <IPlayable>{
                state: VgStates.VG_PLAYING
            };

            spyOn(vgBuffering, 'show');
            vgBuffering.onUpdateBuffer(true);
            expect(vgBuffering.show).toHaveBeenCalled();
        });
        it('should hide if buffer is not detected and video is playing', () => {
            vgBuffering.target = <IPlayable>{
                state: VgStates.VG_PLAYING
            };

            spyOn(vgBuffering, 'hide');
            vgBuffering.onUpdateBuffer(false);
            expect(vgBuffering.hide).toHaveBeenCalled();
        });
        it('should hide if buffer is detected and video is not playing', () => {
            vgBuffering.target = <IPlayable>{
                state: VgStates.VG_PAUSED
            };

            spyOn(vgBuffering, 'hide');
            vgBuffering.onUpdateBuffer(true);
            expect(vgBuffering.hide).toHaveBeenCalled();
        });
    });

    describe('show', ()=>{
        it('should set displayState to "block"', () => {
            vgBuffering.displayState = 'none';
            vgBuffering.show();
            expect(vgBuffering.displayState).toBe('block');
        });
    });
    
    describe('hide', ()=>{
        it('should set displayState to "none"', () => {
            vgBuffering.displayState = 'block';
            vgBuffering.hide();
            expect(vgBuffering.displayState).toBe('none');
        });
    });
});
