
import {Pipe} from "@angular/core";
@Pipe({
    name: 'uriEncode'
})

export class UriEncodePipe {
    transform(input: any, args: Array<any>): string {

        let returnvalue = encodeURIComponent(input);
        // console.log(input);
        // console.log(returnvalue);
        return returnvalue;
    }
}
