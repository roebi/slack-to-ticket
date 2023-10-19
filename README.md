## slack-to-ticket

### in short

slack thread - create a ticket - slack event is a emoji

### longer description

in a slack thread, if you want to create a ticket from it

- set a predefined emoji

result is

- a created ticket with title and content from this slack thread
- and its ticket link in the thread as a answer

## Install

```git bash
git clone https://github.com/roebi/slack-to-ticket.git
cd slack-to-ticket/
npm install
```

## start app a a server

```git bash
npm run start
```

## test

Go to the installed workspace and add a emoji in a channel where the app is registred.

( You can add a emoji a existing DM if the app is registred for this. - not implemented yet )

## TODO

current not issues registered in https://github.com/roebi/slack-to-ticket/issues for this issues:

- remove entry https://www.typescriptlang.org/tsconfig#noImplicitAny in tsconfig.json later
- needed? https://github.com/slackapi/bolt-js/blob/main/examples/getting-started-typescript/tsconfig.eslint.json
- use https://www.npmjs.com/package/dotenv
- see https://www.dotenv.org/
- for details see https://github.com/motdotla/dotenv/tree/master
- use https://www.npmjs.com/package/ts-node and some of iths other addon packages
- is https://www.npmjs.com/package/tslib useful ? This library is primarily used by the --importHelpers flag in TypeScript.
- do we need a node function like node-fetch https://www.npmjs.com/package/node-fetch ?
- https://www.npmjs.com/package/tsd : node run test:tsd need a The test file `app.test-d.ts` or `app.test-d.tsx` does not exist. Create one and try again.

## dev doc

- slack developer HTML base url https://slack.dev/
- https://slack.dev/bolt-js
- https://slack.dev/bolt-js/concepts#event-listening
- https://api.slack.com/tools/bolt
