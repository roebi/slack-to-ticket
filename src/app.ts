const { App, LogLevel } = require("@slack/bolt");

import "./env";

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

// When a member has added an :ticket: emoji reaction to an item
// https://api.slack.com/events/reaction_added
app.event("reaction_added", async ({ event, client, logger }) => {
  logger.error("reaction_added event ...");
  logger.error("event:");
  logger.error(event);
  logger.error("client:");
  logger.error(client);
  logger.error("logger:");
  logger.error(logger);
  // TODO https://github.com/roebi/slack-to-ticket/issues/2 use the :ticket: emoji to trigger the event - current all emoji trigger the event
  try {
    // TODO https://github.com/roebi/slack-to-ticket/issues/8 do not use generalChannelId - should answer in the current thread of the current message
    // Call chat.postMessage with the built-in client
    const result = await client.chat.postMessage({
      channel: event.item.channel,
      text: `Thank you, <@${event.user.id}>, emoji recognized. Ticket will be created. Just a moment please. Wait here for the link to the ticket ...`,
    });
    logger.info(result);
  } catch (error) {
    logger.error(error);
  }
});

(async () => {
  // start app
  await app.start();

  console.log("slack-to-ticket app is running!");
})();

app.use(async ({ next }) => {
  await next();
});
