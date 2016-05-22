import {Pipe, bind} from 'angular2/core';

@Pipe({
    name: 'round'
})

export class RoundPipe {
    transform(input: any, args: Array<any>): string {
        return Math.round(input * 100) / 100 + "";
    }
}
