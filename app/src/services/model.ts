export class Content {
    name: string;
    colorScheme: {
        menuColor: string;
    };
    imprint: {
        name: string;
        type: string;
        $href: string;
    };
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
    video: VideoContet;
    text: string;
}

export class VideoContet {
    videoPath: string;
    trackPath: string;
}

export class Cue {
    id: string;
    endTime: number;
    startTime: number;

    title: string;
    description: string;
    shortDescription: string;
    src: string;
    href: string;

    duration:number;
}
