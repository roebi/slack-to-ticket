"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { App, LogLevel } = require("@slack/bolt");
require("./env");
// bolt using typescript
// see
// https://slack.dev/bolt-js/tutorial/using-typescript
// https://github.com/slackapi/bolt-js/tree/main/examples/getting-started-typescript
// https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
// https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html
// https://www.youtube.com/watch?v=JUORwadOU7s
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    // appToken: process.env.SLACK_APP_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    logLevel: LogLevel.DEBUG,
    // TODO https://github.com/roebi/slack-to-ticket/issues/3 remove socketMode
    // https://www.npmjs.com/package/@slack/bolt
    // uses SocketMode
    socketMode: false,
    port: Number(process.env.PORT) || 3000
});
// listening to events https://slack.dev/bolt-js/concepts#event-listening
// TODO https://github.com/roebi/slack-to-ticket/issues/1 reaction_added is not recognized
// https://www.npmjs.com/package/@slack/bolt#listening-for-events
// The Slack Request URL for a Bolt app must have the path set to /slack/events.
// For example: https://my-slack-app.example.com/slack/events.
// Otherwise, all incoming requests from Slack won't be handled.
// https://slack.dev/bolt-js/concepts#event-listening
// When a member has added an :ticket: emoji reaction to an item
// https://api.slack.com/events/reaction_added
app.event("reaction_added", ({ event, client, logger }) => __awaiter(void 0, void 0, void 0, function* () {
    logger.debug("reaction_added event ...");
    logger.debug("event:");
    logger.debug(event);
    logger.debug("event.reaction:");
    logger.debug(event.reaction);
    logger.debug("event.user:");
    logger.debug(event.user);
    logger.debug("client:");
    logger.debug(client);
    logger.debug("logger:");
    logger.debug(logger);
    // TODO https://github.com/roebi/slack-to-ticket/issues/2 use the :ticket: emoji to trigger the event - current all emoji trigger the event
    try {
        // TODO https://github.com/roebi/slack-to-ticket/issues/8 do not use generalChannelId - should answer in the current thread of the current message
        // Call chat.postMessage with the built-in client
        const result = yield client.chat.postMessage({
            channel: event.item.channel,
            text: `Thank you, <@${event.user}>, emoji recognized. Ticket will be created. Just a moment please. Wait here for the link to the ticket ...`,
        });
        logger.info(result);
    }
    catch (error) {
        logger.error(error);
    }
}));
(() => __awaiter(void 0, void 0, void 0, function* () {
    // start app
    yield app.start();
    console.log("slack-to-ticket app is running!");
}))();
// app.use(async ({ next }) => {
//   await next();
// });
//# sourceMappingURL=app.js.map