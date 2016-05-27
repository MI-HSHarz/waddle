export interface IdInterface {
    id: string;
}

export function indexOfId(array: IdInterface[], id: string): number {
    const length = array.length;
    for (let i = 0; i < length; i++) {
        if (array[i].id === id) {
            // console.log(i);
            return i;
        }
    }
    // console.log(-1);
    return -1;
}
