"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fanOutUnit = exports.fanOut = void 0;
const functions = require("firebase-functions");
const pubsub_1 = require("@google-cloud/pubsub");
const firebase_1 = require("./firebase");
const { log } = functions.logger;
const projectId = JSON.parse(process.env.FIREBASE_CONFIG || '{}').projectId;
exports.fanOut = firebase_1.https.onRequest(async (req, res) => {
    const pubsub = new pubsub_1.PubSub({ projectId });
    // Creates a new topic
    const [topic] = await pubsub.createTopic('fanout-unit');
    for (let i = 1; i <= 3; i++) {
        topic.publishMessage({
            json: {
                count: i,
            },
        });
    }
    res.send('done').end();
});
exports.fanOutUnit = firebase_1.base.pubsub.topic('fanout-unit').onPublish((msg) => {
    log(msg.data);
    log(msg.json);
});
//# sourceMappingURL=fanOut.js.map