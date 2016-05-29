import {IdInterface} from "../util/comon";
export class Content {
    name: string;
    colorScheme: {
        menuColor: string;
    };
    imprint: {
        name: string;
        $href: string;
    };
    pages: MenuPage[];
    modules: ContentModul[];
}

export class ContentModul {
    name: string;
    pages: MenuPage[];
}

export class MenuPage {
    menuName: string;
    type: string;
    $href: string;
    subPages: MenuPage[];
}

export class Page {
    titel: string;
    components: ContetComponent[];
}

export class ContetComponent {
    gallery: GalleryImage[];

    video: {
        videoPath: string;
        trackPath: string;
    };

    text: string[];
}

export class GalleryImage {
    path: string;
    caption: string;
}

export class VideoContet {
    videoPath: string;
    trackPath: string;
}

export class Cue implements IdInterface {
    id: string;
    endTime: number;
    startTime: number;

    title: string;
    description: string;
    shortDescription: string;
    src: string;
    href: string;

    duration: number;
}
