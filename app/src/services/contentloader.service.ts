import {Injectable} from "angular2/core";
import {Http, Response} from "angular2/http";
import {Subject} from "rxjs/Subject";
import {Content} from "./model";
import {PageService} from "./page.service";


@Injectable()
export class ContentloaderService {

    contentSubject: Subject<Content> = new Subject<Content>();

    private apiBaseUrl: string = 'data/content.json';

    private content: string;


    constructor(private _http: Http,
                private _pageService: PageService) {
        this.load();
    }

    getContent(): string {
        return this.content;
    }

    public load() {
        this._http.get(this.apiBaseUrl)
            .map((res: Response) => res.json())
            .subscribe(
                (content: Content) => {
                    this.contentSubject.next(content);

                    content.pages.forEach( menuPage => {
                        this._pageService.addPageToCache(menuPage.$href);
                    });
                },
                error => {
                    console.log(error);
                }
            );

    }
}

