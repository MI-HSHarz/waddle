import {Injectable} from "angular2/core";
import {Http, Response} from "angular2/http";
import {Subject} from "rxjs/Subject";
import Dictionary from "../util/Dictionary";
import {Page} from "./model";


@Injectable()
export class PageService {

    private pageCacheDict: Dictionary<string, Page> = new Dictionary<string, Page>();
    private apiBaseUrl: string = 'data/';

    constructor(private _http: Http) {}

    addPageToCache(pageRef: string) {
        this.fetchPage(pageRef)
            .subscribe(
                (page: Page) => {
                    this.pageCacheDict.setValue(pageRef, page);
                    //console.log(this.pageCacheDict);
                },
                error => {
                    console.log(error);
                    return error;
                }
            );
    }

    public getPage(pageRef: string): Page {
        return this.pageCacheDict.getValue(pageRef);
    }

    public fetchPage(pageRef: string) {
        return this._http.get(this.apiBaseUrl + pageRef)
            .map((res: Response) => res.json());
    }
}
