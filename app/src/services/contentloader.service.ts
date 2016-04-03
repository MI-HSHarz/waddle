import {Injectable} from "angular2/core";
import {Http, Response} from "angular2/http";
import {Subject} from "rxjs/Subject";


@Injectable()
export class ContentloaderService {

    contentSubject: Subject<Content> = new Subject<Content>();

    private apiBaseUrl: string = 'data/content.json';

    private content: string;


    constructor(public _http: Http) {
        this.load();
    }

    getContent(): string {
        return this.content;
    }

    public load() {
        return this._http.get(this.apiBaseUrl)
            .map((res: Response) => res.json())
            .subscribe(
                (res: Content) => {
                    // console.log(res);
                    this.contentSubject.next(res);
                },
                error => {
                    console.log(error);
                }
            );

    }
}

export class Content {
    name: string;
    pages: string[];
}

export class Page {
    name: string;
    subPages: SubPage[];
    video: VideoContet;
    text: string;
}

export class SubPage {
    name: string;
    video: VideoContet;
    text: string;
}

export class VideoContet {
    videoPath: string;
    trackPath: string;
}
