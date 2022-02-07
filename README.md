# Snotes
A partly useful notes application written for Slack. The idea is to turn notes into follow-up actions so tasks/decisions/insights written in Slack are easier to track and action as a team.

Write this in a Slack message:
Actions from today's meeting:
- @wood You need to do lots of things
- #hermes-decisions We decided it's time to release the product today
- #hermes-team We need to figure out all the things about all the stuff

Use the 'Turn Note into Actions' message action on that message... and get this...

A task for @wood in thread:
![Wood Task](https://raw.githubusercontent.com/swoodslack/snotes/master/assets/screenshot_wood.png)

A task in #hermes-decisions:
![Hermes Decisions Task](https://raw.githubusercontent.com/swoodslack/snotes/master/assets/screenshot_decisions.png)

And a task in #hermes-team:
![Hermes Decisions Task](https://raw.githubusercontent.com/swoodslack/snotes/master/assets/screenshot_team.png)

## Running it locally

```bash
slack run
```

## Deploying to Slack's Hosting

```bash
slack deploy
```
