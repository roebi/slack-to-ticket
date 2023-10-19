const { App } = require("@slack/bolt");

// bolt using typescript
// see
// https://slack.dev/bolt-js/tutorial/using-typescript
// https://github.com/slackapi/bolt-js/tree/main/examples/getting-started-typescript



const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  // TODO https://github.com/roebi/slack-to-ticket/issues/3 remove socketMode
  // https://www.npmjs.com/package/@slack/bolt
  // uses SocketMode
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

// listening to events https://slack.dev/bolt-js/concepts#event-listening

// TODO https://github.com/roebi/slack-to-ticket/issues/8 do not use generalChannelId - should answer in the current thread of the current message
const generalChannelId = "C061NA516DS";

// TODO https://github.com/roebi/slack-to-ticket/issues/1 reaction_added is not recognized
// https://www.npmjs.com/package/@slack/bolt#listening-for-events
// The Slack Request URL for a Bolt app must have the path set to /slack/events.
// For example: https://my-slack-app.example.com/slack/events.
// Otherwise, all incoming requests from Slack won't be handled.

// When a member has added an emoji reaction to an item
// https://api.slack.com/events/reaction_added
app.event("reaction_added", async ({ event: any, client: any, logger: any }) => {
  // TODO https://github.com/roebi/slack-to-ticket/issues/2 use the ticket emoji to trigger the event - current all emoji trigger the event
  try {
    // TODO https://github.com/roebi/slack-to-ticket/issues/8 do not use generalChannelId - should answer in the current thread of the current message
    // Call chat.postMessage with the built-in client
    const result = await client.chat.postMessage({
      channel: generalChannelId,
      text: `Thank you, <@${event.user.id}>, emoji recognized. Ticket will be created. Just a moment please. Wait here for the link to the ticket ...`,
    });
    logger.info(result);
  } catch (error) {
    logger.error(error);
  }
});

(async () => {
  // start app
  await app.start(process.env.PORT || 3000);

  console.log("slack-to-ticket app is running!");
})();
