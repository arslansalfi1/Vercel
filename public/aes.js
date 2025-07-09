// slowAES.js - JavaScript AES Implementation (128-bit Block Size)
var slowAES = {
    decrypt: function (input, mode, key, iv) {
        return this._decrypt(input, key, iv);
    },

    _decrypt: function (input, key, iv) {
        var CryptoJS = requireCryptoJS();

        var keyWords = CryptoJS.lib.WordArray.create(key);
        var ivWords = CryptoJS.lib.WordArray.create(iv);
        var ciphertext = CryptoJS.lib.WordArray.create(input);

        var decrypted = CryptoJS.AES.decrypt(
            { ciphertext: ciphertext },
            keyWords,
            {
                iv: ivWords,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
        );

        return Array.from(decrypted.words).flatMap(word => [
            (word >> 24) & 0xff,
            (word >> 16) & 0xff,
            (word >> 8) & 0xff,
            word & 0xff
        ]).slice(0, decrypted.sigBytes);
    }
};

// Minimal required CryptoJS parts
function requireCryptoJS() {
    if (typeof CryptoJS === 'undefined') {
        var CryptoJS = {};
        (function () {
            // Include only AES, enc-hex, lib-core, mode-cbc, pad-pkcs7
            // Since browser import is needed, include external script manually
            throw new Error("CryptoJS is required. You must include CryptoJS (aes.js, enc-hex.js, etc.) before using slowAES.");
        })();
    }
    return CryptoJS;
}
