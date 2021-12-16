"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yamabiko = void 0;
const firebase_1 = require("./firebase");
exports.yamabiko = firebase_1.https.onRequest((req, res) => {
    res.send(req.body).end();
});
//# sourceMappingURL=yamabiko.js.map