"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function auth(bearerToken) {
    console.debug("services::user.ts::auth()");
    return new Promise(function (resolve, reject) {
        var token = bearerToken.replace('Bearer ', '');
        console.debug("services::user.ts::auth() .. token::[" + token + "]");
        if (token === 'fakeToken') {
            return resolve({ userId: 'fakeTokenId' });
        }
        return resolve({ error: { type: 'unauthorized', message: 'Authorization Failed' } });
    });
}
exports.default = { auth: auth };
