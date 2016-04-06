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
