import {Injectable} from '@angular/core';
import {Subject, ReplaySubject} from "rxjs";
import {Content} from "../util/model";
import {Http, Response} from "@angular/http";
import {PageService} from "./page.service";

@Injectable()
export class ContentloaderService {

    contentSubject: Subject<Content> = new ReplaySubject<Content>();

    modulTitelSubject: Subject<string> = new ReplaySubject<string>();
    modulNumberSubject: Subject<number> = new ReplaySubject<number>();


    private apiBaseUrl: string = 'public/data/content.json';

    private content: Content;

    constructor(private _http: Http,
                private _pageService: PageService) {
        this.load();

    }

    setModulTitel(titel: string) {
        this.modulTitelSubject.next(titel);
    }

    setModulNumber(titel: number) {
        this.modulNumberSubject.next(titel);
    }

    public load() {
        this._http.get(this.apiBaseUrl)
            .map((res: Response) => res.json())
            .subscribe(
                (content: Content) => {
                    this.content = content;
                    this.contentSubject.next(this.content);

                    content.modules.forEach(module => {
                        module.pages.forEach(menuPage => {
                            this._pageService.addPageToCache(menuPage.$href);
                        });
                    });

                },
                error => {
                    console.log(error);
                }
            );

    }

}
