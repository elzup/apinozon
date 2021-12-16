"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalip = exports.helloWorld = exports.fanOutUnit = exports.fanOut = exports.manifest = void 0;
const functions = require("firebase-functions");
const dynamicPwa_1 = require("./dynamicPwa");
Object.defineProperty(exports, "manifest", { enumerable: true, get: function () { return dynamicPwa_1.manifest; } });
const fanOut_1 = require("./fanOut");
Object.defineProperty(exports, "fanOut", { enumerable: true, get: function () { return fanOut_1.fanOut; } });
Object.defineProperty(exports, "fanOutUnit", { enumerable: true, get: function () { return fanOut_1.fanOutUnit; } });
const firebase_1 = require("./firebase");
const { info } = functions.logger;
exports.helloWorld = firebase_1.https.onRequest((req, res) => {
    info('Hello logs!', { structuredData: true });
    res.send('anozon hello');
});
exports.globalip = firebase_1.https.onRequest((req, res) => {
    const ip = req.header('fastly-client-ip');
    res.send(ip);
});
//# sourceMappingURL=index.js.map