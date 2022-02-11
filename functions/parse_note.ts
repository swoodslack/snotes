import { DefineFunction, Schema } from "slack-cloud-sdk/mod.ts";
import { clearSentItems, sendItems } from "../shared/messenger.ts";
import { deleteItemsForNote, saveItemsForNote } from "../shared/storage.ts";
import { getLinkToMessage } from "../shared/utils.ts";
import { parseNote } from "../shared/parser.ts";
import { Item } from "../interfaces/item.ts";

export const ParseNoteFunction = DefineFunction(
  "parse_note_function",
  {
    title: "Turn Note into Actions",
    description: "Takes the provided note and parses it to items of work",
    input_parameters: {
      required: ["note_channel_id", "note_message_ts", "note_user_id", "note"],
      properties: {
        note_channel_id: {
          type: Schema.slack.types.channel_id,
          description: "The channel id for the note",
        },
        note_message_ts: {
          type: Schema.types.string,
          description: "The message id for the note",
        },
        note_user_id: {
          type: Schema.slack.types.user_id,
          description: "The user running this function",
        },
        note: {
          type: Schema.types.string,
          description: "The note to parse",
        },
      },
    },
  },
  async ({ inputs, client, env }) => {
    // Get the permalink to the message with the note
    const noteMessageLink: string = await getLinkToMessage(
      client,
      inputs.note_channel_id,
      inputs.note_message_ts,
    );

    // Delete any prior rows and messages for this note
    const deletedItems: Item[] = await deleteItemsForNote(
      client,
      inputs.note_message_ts,
    );
    await clearSentItems(client, deletedItems);

    // Get the items out of the note
    const items: Item[] = parseNote(
      inputs.note,
      inputs.note_channel_id,
      inputs.note_message_ts,
    );

    // Send the items from the note
    await sendItems(client, items, inputs.note_user_id, noteMessageLink);

    // Store the items so we have them for queries
    await saveItemsForNote(
      client,
      items,
    );

    return await {
      outputs: {},
    };
  },
);
