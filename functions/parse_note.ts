import { DefineFunction, Schema } from "slack-cloud-sdk/mod.ts";
import { PostItem } from "../shared/post_item.ts";

export const ParseNoteFunction = DefineFunction(
  "parse_note_function",
  {
    title: "Parse Note",
    description: "Takes the provided note and parses it to items of work",
    input_parameters: {
      required: ["channel_id", "note"],
      properties: {
        channel_id: {
          type: Schema.slack.types.channel_id,
          description: "The channel to post items to",
        },
        message_id: {
          type: Schema.types.string,
          description: "The message id for the note",
        },
        title: {
          type: Schema.types.string,
          description: "The title for the note",
        },
        tags: {
          type: Schema.types.array,
          items: {
            type: Schema.slack.types.channel_id,
          },
          description: "Channels to tag for this note",
        },
        note: {
          type: Schema.types.string,
          description: "The note to parse",
        },
      },
    },
  },
  async ({ inputs, client, env }) => {
    console.log("Parsing note...");
    let thread_ts: string = (inputs.message_id) ? inputs.message_id : "";

    if (thread_ts != null && thread_ts.trim().length === 0) {
      const result = await client.call("chat.postMessage", {
        channel: inputs.channel_id,
        text: "Hello note",
      });
      thread_ts = String(result.ts);
    }

    await PostItem(
      client,
      env,
      thread_ts,
      inputs.channel_id,
      "123",
      "task",
      "Do Something",
      "U0304MY4SDV",
      "U0304MY4SDV",
      1644029220,
      "This is the content of my task.",
      true,
      false,
    );

    await PostItem(
      client,
      env,
      thread_ts,
      inputs.channel_id,
      "456",
      "insight",
      "So Interesting",
      "",
      "U0304MY4SDV",
      1644029220,
      "This is the content of my insight.",
      false,
      false,
    );

    await PostItem(
      client,
      env,
      thread_ts,
      inputs.channel_id,
      "789",
      "decision",
      "Make it happen",
      "U0304MY4SDV",
      "U0304MY4SDV",
      1644029220,
      "This is the content of my decision.",
      false,
      false,
    );

    return await {
      outputs: {},
    };
  },
);
