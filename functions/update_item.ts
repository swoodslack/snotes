import { DefineFunction, Schema } from "slack-cloud-sdk/mod.ts";
import { clearSentItems, sendItems } from "../shared/messenger.ts";
import { deleteItemsForNote, saveItemsForNote } from "../shared/storage.ts";
import { getLinkToMessage } from "../shared/utils.ts";
import { parseNote } from "../shared/parser.ts";
import { Item } from "../interfaces/item.ts";

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

    return await {
      outputs: {},
    };
  },
);
