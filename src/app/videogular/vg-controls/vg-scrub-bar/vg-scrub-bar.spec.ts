import {VgScrubBar} from "./vg-scrub-bar";
import {VgAPI} from "../../services/vg-api";
import {ElementRef} from "@angular/core";

describe('Scrub bar', () => {
    let scrubBar:VgScrubBar;
    let ref:ElementRef;
    let api:VgAPI;

    beforeEach(() => {
        ref = {
            nativeElement: {
                getAttribute: (name) => {
                    return name;
                },
                scrollWidth: 200
            }
        };

        api = new VgAPI();

        scrubBar = new VgScrubBar(ref, api);
    });

    it('Should get media by id on init', () => {
        spyOn(scrubBar.elem, 'getAttribute').and.callThrough();
        spyOn(api, 'getMediaById');

        scrubBar.onPlayerReady();

        expect(scrubBar.elem.getAttribute).toHaveBeenCalledWith('vg-for');
        expect(api.getMediaById).toHaveBeenCalledWith('vg-for');
    });

    describe('onMouseDownScrubBar', () => {
        it('should call API seekTime 10 when offsetX is 20 and scrollWidth is 200', () => {
            spyOn(api, 'seekTime');

            scrubBar.target = api;

            scrubBar.onMouseDownScrubBar({ offsetX: 20 });

            expect(api.seekTime).toHaveBeenCalledWith(10, true);
        });
    });
});
