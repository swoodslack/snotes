import { DefineFunction, Schema } from "slack-cloud-sdk/mod.ts";
import {
  REACTJI_DONE,
  REACTJI_IN_PROGRESS,
  REACTJI_NOT_DOING,
} from "../shared/block_kit_builder.ts";
import { updateItemStatus } from "../shared/storage.ts";
import { getMessage } from "../shared/messenger.ts";

export const UpdateItemFunction = DefineFunction(
  "update_item_function",
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
  async ({ inputs, client, env }) => {
    console.log(inputs.reaction);

    // Get the message so we have the full context of this reaction event
    const message = await getMessage(
      client,
      inputs.item_channel_id,
      inputs.item_message_ts,
    );

    if (
      inputs.reaction === REACTJI_DONE ||
      inputs.reaction === REACTJI_IN_PROGRESS ||
      inputs.reaction === REACTJI_NOT_DOING
    ) {
      await updateItemStatus(client, inputs.item_message_ts, inputs.reaction);
    }

    return await {
      outputs: {},
    };
  },
);
