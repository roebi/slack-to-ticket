const { App } = require('@slack/bolt');

// uses SocketMode

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN
  });
  
// listening to events https://slack.dev/bolt-js/concepts#event-listening
const generalChannelId = 'C061NA516DS';

// When a member has added an emoji reaction to an item
// https://api.slack.com/events/reaction_added
app.event('reaction_added', async ({ event, client, logger }) => {
  try {
    // Call chat.postMessage with the built-in client
    const result = await client.chat.postMessage({
      channel: generalChannelId,
      text: `Thank you, <@${event.user.id}>, emoji recognized. Ticket will be created. Just a moment please. Wait here for the link to the ticket ...`
    });
    logger.info(result);
  }
  catch (error) {
    logger.error(error);
  }
});

(async () => {
    // start app
    await app.start(process.env.PORT || 3000);
  
    console.log('slack-to-ticket app is running!');
  })();
