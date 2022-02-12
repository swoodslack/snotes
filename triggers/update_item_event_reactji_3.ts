import { DefineTrigger, Schema, TriggerTypes } from "slack-cloud-sdk/mod.ts";
import { UpdateItemWorkflow } from "../workflows/update_item.ts";

export const UpdateItemEventReactji3 = DefineTrigger(
  "update_item_event_reactji_3",
  {
    type: TriggerTypes.Event,
    event_type: Schema.slack.events.ReactionAdded,
  },
)
  .runs(UpdateItemWorkflow)
  .availableToChannel("C0325PPURGR")
  .withInputs((ctx) => ({
    item_channel_id: ctx.data.channel_id,
    item_message_ts: ctx.data.message_ts,
    item_user_id: ctx.data.user_id,
    reaction: ctx.data.reaction,
  }));
