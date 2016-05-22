import {Pipe, bind} from 'angular2/core';

@Pipe({
    name: 'round'
})

export class RoundPipe {
    transform(input: any, args: Array<any>): string {

        let returnvalue = Math.round(input * 100) / 100;
        // console.log(input);
        // console.log(returnvalue);
        return returnvalue;
    }
}
