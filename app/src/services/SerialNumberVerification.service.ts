import {Injectable} from "angular2/core";

@Injectable()
export class SerialNumberVerificationService {

    private KEY_GOOD = 0;

    private KEY_INVALID = 1;

    private KEY_BLACKLISTED = 2;

    private KEY_PHONY = 3;

    private BL = [
        "11111111"
    ];


    /**
     * Generates a Key Byte
     * @param {32bit integer} seed e.g. 0xA2791717
     * @param {8bit integer} a
     * @param {8bit integer} b
     * @param {8bit integer} c
     * @return {8bit hex string}
     */
    private pKV_GetKeyByte(seed, a, b, c) {
        var result;
        a = a % 25;
        b = b % 3;
        if ( a % 2 == 0 ) {
            result = ((seed >> a) & 0x000000FF) ^ ((seed >> b) | c);
        } else {
            result = ((seed >> a) & 0x000000FF) ^ ((seed >> b) & c);
        }
        result = result & 0xFF;
        /* mask 255 values! */
        return result.toString(16).toUpperCase();
    }

    /**
     * Generates the checksum
     * @param {string} s Seed + Keys
     * @return {16bit hex string}
     */
    private pKV_GetChecksum(s: string) {
        var left, /* unsigned 16bit integer */
            right, /* unsigned 16bit integer */
            sum;
        /* unsigned 16bit integer */
        left = 0x0056;
        /* 101 */
        right = 0x00AF;
        /* 175 */
        if ( s.length ) {
            for ( var i = 0; i < s.length; i++ ) {
                right += s.charCodeAt(i);
                if ( right > 0x00FF ) {
                    right -= 0x00FF;
                }
                left += right;
                if ( left > 0x00FF ) {
                    left -= 0x00FF;
                }
            }
            ;
        }
        sum = (left << 8) + right;
        return sum.toString(16);
    }

    /**
     * Generates a serial number
     * @param {32bit integer} seed
     * @return {20 chars String}
     */
    pKV_MakeKey(seed: string) {
        var keyBytes = [],
            result = "",
            serial;

        /* Fill keyBytes with values derived from Seed.
         The parameters used here must be extactly the same
         as the ones used in the pKV_CheckKey function.
         A real key system should use more than four bytes. */

        keyBytes[0] = this.pKV_GetKeyByte(seed, 24, 3, 200);
        keyBytes[1] = this.pKV_GetKeyByte(seed, 10, 0, 56);
        keyBytes[2] = this.pKV_GetKeyByte(seed, 1, 2, 91);
        keyBytes[3] = this.pKV_GetKeyByte(seed, 7, 1, 100);

        /* the key string begins with a hexidecimal string of the seed */

        result = seed.substr(0, 15).toUpperCase();

        /* then is followed by hexidecimal strings of each byte in the key */
        for ( var i = 0; i < keyBytes.length; i++ ) {
            result += keyBytes[i].toUpperCase();
        }
        ;

        /* Add checksum to key string */
        result += this.pKV_GetChecksum(result).toUpperCase();

        /* Add some hyphens to make it easier to type */
        serial = result.split("");
        var j = serial.length - 4;
        while (j > 1) {
            serial.splice(j, 0, "-");
            j = j - 4;
        }
        return serial.join("");

    }



    /**
     * Checks if the checksum in the serial is correct
     * @param {String} key The 20 chars serial
     * @return {boolean}
     */
    pKV_CheckKeyChecksum(key) {
        var s, c,
            result = false;
        s = key.replace(/-/g, "").toUpperCase();
        if ( s.length !== 20 ) {
            return result
        }
        c = s.slice(s.length - 4);
        s = s.slice(0, 16);
        result = ( c === this.pKV_GetChecksum(s).toUpperCase());
        return result;
    }

    /**
     * Check if the Serial is valid
     * @param {String} s 20 chars serial
     * @return {integer}
     * KEY_GOOD = 0,
     * KEY_INVALID = 1,
     * KEY_BLACKLISTED = 2,
     * KEY_PHONY = 3,
     */
    pKV_CheckKey(s) {
        var key, /* String */
            kb, /* String */
            seed, /* Int32 */
            b, /* Byte */
            result = this.KEY_INVALID;

        if ( !this.pKV_CheckKeyChecksum(s) ) {
            /* bad checksum or wrong number of characters */

            console.log(" bad checksum or wrong number of characters");
            return result;
        }
        /* remove cosmetic hypens and normalize case */
        key = s.replace(/-/g, "").toUpperCase();

        /* test against blacklist */
        var bl = this.BL.length
        if ( bl ) {
            for ( var i = 0; i < bl; i++ ) {
                if ( key.indexOf(this.BL[i].toUpperCase()) > -1 ) {
                    result = this.KEY_BLACKLISTED;
                    return result;
                }
            }
        }

        /* At this point, the key is either valid or forged,
         * because a forged key can have a valid checksum.
         * We now test the "bytes" of the key to determine if it is
         * actually valid.
         * When building your release application, use conditional defines
         * or comment out most of the byte checks!  This is the heart
         * of the partial key verification system. By not compiling in
         * each check, there is no way for someone to build a keygen that
         * will produce valid keys.  If an invalid keygen is released, you
         * simply change which byte checks are compiled in, and any serial
         * number built with the fake keygen no longer works.
         * Note that the parameters used for pKV_GetKeyByte calls MUST
         * MATCH the values that pKV_MakeKey uses to make the key in the
         * first place! 
         */

        result = this.KEY_PHONY;

        /* extract the Seed from the supplied key string */
        seed = key.substr(0, 8);
        /* test whether the seed is a valid HEX */
        if ( seed.match(/[A-F0-9]{8}/) === null ) {
            return result;
        }

        /* Keys test - never test them all! */

        /* Testing K1 */
        kb = key.substr(8, 2);
        b = this.pKV_GetKeyByte(parseInt(seed, 16), 24, 3, 200);
        if ( kb !== b.toUpperCase() ) {
            return result;
        }

        /* Testing K2 */
        kb = key.substr(10, 2);
        b = this.pKV_GetKeyByte(parseInt(seed, 16), 10, 0, 56);
        if ( kb !== b.toUpperCase() ) {
            return result;
        }

        /* Testing K3 */
        kb = key.substr(12, 2);
        b = this.pKV_GetKeyByte(parseInt(seed, 16), 1, 2, 91);
        if ( kb !== b.toUpperCase() ) {
            return result;
        }

        /* Testing K4 */
        kb = key.substr(14, 2);
        b = this.pKV_GetKeyByte(parseInt(seed, 16), 7, 1, 100);
        if ( kb !== b.toUpperCase() ) {
            return result;
        }

        /* If we get this far, then it means the key is either good, or was made
         * with a keygen derived from "this" release. */

        result = this.KEY_GOOD;
        return result;
    }

}
