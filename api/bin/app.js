"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./utils/server");
console.debug("app.ts::init()");
server_1.createServer()
    .then(function (server) {
    server.listen(3021, function () {
        console.info("Listening on port: " + 3021);
    });
})
    .catch(function (err) {
    console.error("Error:: " + err);
});
