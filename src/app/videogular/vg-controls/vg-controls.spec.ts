import {VgControls} from "./vg-controls";
import {ElementRef} from "@angular/core";
import {VgAPI} from "../services/vg-api";
import {Observable} from "rxjs/Observable";

describe('Controls Bar', () => {
    let controls:VgControls;
    let ref:ElementRef;
    let api:VgAPI;

    beforeEach(() => {
        jasmine.clock().uninstall();
        jasmine.clock().install();

        api = new VgAPI();

        ref = {
            nativeElement: {
                getAttribute: (name) => {
                    return name;
                }
            }
        };

        controls = new VgControls(api, ref);
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    it('Should have been defined', () => {
        expect(controls).toBeTruthy();
    });

    it('Should listen for mouseenter and mouseleave events', () => {
        spyOn(Observable, 'fromEvent').and.callThrough();

        var vgElem = document.createElement('vg-player');

        api.registerElement(vgElem);

        controls.ngOnInit();

        expect(Observable.fromEvent).toHaveBeenCalledWith(api.videogularElement, 'mouseenter');
        expect(Observable.fromEvent).toHaveBeenCalledWith(api.videogularElement, 'mouseleave');
    });

    it('Should hide controls after view init', () => {
        spyOn(controls, 'hide').and.callFake(() => {});

        controls.autohide = true;

        controls.ngAfterViewInit();

        expect(controls.hide).toHaveBeenCalled();
    });

    it('Should show controls after view init', () => {
        spyOn(controls, 'show').and.callFake(() => {});

        controls.autohide = false;

        controls.ngAfterViewInit();

        expect(controls.show).toHaveBeenCalled();
    });

    it('Should show controls', () => {
        spyOn(window, 'clearTimeout').and.callFake(() => {});

        controls.show();

        expect(window.clearTimeout).toHaveBeenCalled();
        expect(controls.hideControls).toBe(false);
    });

    it('Should hide controls', () => {
        controls.autohide = true;

        controls.hide();

        jasmine.clock().tick(3100);
        expect(controls.hideControls).toBe(true);
    });

    it('Should not hide controls', () => {
        controls.hideControls = false;
        controls.autohide = false;

        controls.hide();

        jasmine.clock().tick(3100);
        expect(controls.hideControls).toBe(false);
    });
});
