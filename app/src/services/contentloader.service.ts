import {Injectable} from "angular2/core";
import {Http, Response} from "angular2/http";
import {Subject} from "rxjs/Subject";
import {Content} from "./model";
import {PageService} from "./page.service";
import {ReplaySubject} from "rxjs/Rx";


@Injectable()
export class ContentloaderService {

    contentSubject: Subject<Content> = new ReplaySubject<Content>();

    // modulTitelSubject: Subject<number> = new ReplaySubject<number>();

    private apiBaseUrl: string = 'data/content.json';

    private content: Content;

    constructor(private _http: Http,
                private _pageService: PageService) {
        this.load();
    }

    // setModulTitel(titel: number){
    //     this.modulTitelSubject.next( titel);
    // }

    public load() {
        this._http.get(this.apiBaseUrl)
            .map((res: Response) => res.json())
            .subscribe(
                (content: Content) => {
                    this.content = content;
                    this.contentSubject.next( this.content);

                    content.modules.forEach(module => {
                        module.pages.forEach( menuPage => {
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

