import { DefineTrigger, Schema, TriggerTypes } from "slack-cloud-sdk/mod.ts";
import { UpdateItemWorkflow } from "../workflows/update_item.ts";

export const UpdateItemEventReactji2 = DefineTrigger(
  "update_item_event_reactji_2",
  {
    type: TriggerTypes.Event,
    event_type: Schema.slack.events.ReactionAdded,
  },
)
  .runs(UpdateItemWorkflow)
  .availableToChannel("C031VEA1KNY")
  .withInputs((ctx) => ({
    item_channel_id: ctx.data.channel_id,
    item_message_ts: ctx.data.message_ts,
    item_user_id: ctx.data.user_id,
    reaction: ctx.data.reaction,
  }));
