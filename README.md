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
