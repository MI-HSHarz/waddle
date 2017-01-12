import {Pipe} from "@angular/core";

@Pipe({name: 'replace'})
export class ReplacePipe {
    transform(input: any, args: Array<any>): string {
        let s = input.replace("-", "").replace("\n", "").replace("MetaReflexionen", "Meta-Reflexionen");

        return s;
    }
}