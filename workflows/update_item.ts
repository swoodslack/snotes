import { DefineWorkflow, Schema } from "slack-cloud-sdk/mod.ts";
import { UpdateItemFunction } from "../functions/update_item.ts";

export const UpdateItemWorkflow = DefineWorkflow(
  "update_item_workflow",
  {
    title: "Update Item",
    description: "Updates the status of an item",
    input_parameters: {
      required: [
        "item_channel_id",
        "item_message_ts",
        "item_user_id",
        "reaction",
      ],
      properties: {
        item_channel_id: {
          type: Schema.slack.types.channel_id,
          description: "The channel id for the update",
        },
        item_message_ts: {
          type: Schema.types.string,
          description: "The message id for the update",
        },
        item_user_id: {
          type: Schema.slack.types.user_id,
          description: "The user running this workflow",
        },
        reaction: {
          type: Schema.types.string,
          description: "The reactji for the update",
        },
      },
    },
  },
);

UpdateItemWorkflow.addStep(UpdateItemFunction, {
  item_channel_id: UpdateItemWorkflow.inputs.item_channel_id,
  item_message_ts: UpdateItemWorkflow.inputs.item_message_ts,
  item_user_id: UpdateItemWorkflow.inputs.item_user_id,
  reaction: UpdateItemWorkflow.inputs.reaction,
});
