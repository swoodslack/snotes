import { DefineFunction, Schema } from "slack-cloud-sdk/mod.ts";
import { dispatchItems } from "../shared/item_dispatcher.ts";
import { parseItem } from "../shared/item_parser.ts";
import { Item } from "../interfaces/item.ts";

export const ParseNoteFunction = DefineFunction(
  "parse_note_function",
  {
    title: "Turn Note into Actions",
    description: "Takes the provided note and parses it to items of work",
    input_parameters: {
      required: ["note_channel_id", "note_message_ts", "note"],
      properties: {
        note_channel_id: {
          type: Schema.slack.types.channel_id,
          description: "The channel id for the note",
        },
        note_message_ts: {
          type: Schema.types.string,
          description: "The message id for the note",
        },
        note: {
          type: Schema.types.string,
          description: "The note to parse",
        },
      },
    },
  },
  async ({ inputs, client, env }) => {
    const items: Item[] = [];

    //console.log(inputs.note);
    console.log(inputs);
    console.log(client);
    console.log(env);

    const userItems = inputs.note.match(/<@[A-Z0-9].*/g);
    //console.log(userItems);
    if (userItems != null && userItems.length > 0) {
      for (let x = 0; x < userItems.length; x++) {
        items.push(
          parseItem(
            inputs.note_channel_id,
            inputs.note_message_ts,
            userItems[x],
          ),
        );
      }
    }

    const channelItems = inputs.note.match(/<#[A-Z0-9].*/g);
    //console.log(channelItems);
    if (channelItems != null && channelItems.length > 0) {
      for (let x = 0; x < channelItems.length; x++) {
        items.push(
          parseItem(
            inputs.note_channel_id,
            inputs.note_message_ts,
            channelItems[x],
          ),
        );
      }
    }
    //console.log(items);

    await dispatchItems(client, env, items);

    return await {
      outputs: {},
    };
  },
);
