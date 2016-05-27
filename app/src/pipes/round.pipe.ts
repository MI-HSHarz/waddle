import {Pipe, bind} from 'angular2/core';

@Pipe({
    name: 'round'
})

export class RoundPipe {
    transform(input: any, args: Array<any>): string {
        let round = Math.round(input * 10) / 10;
        let min = Math.floor(round  / 60);

        let sec = round - min * 60;

        if ( sec > 9) {
            return min + ":" + sec + " min" ;
        } else if (sec === 0) {
            return min + ":00" + " min" ;
        }
        return min + ":0" + sec + " min";
    }
}
