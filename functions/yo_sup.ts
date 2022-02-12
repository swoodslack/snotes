import { DefineFunction, Schema } from "slack-cloud-sdk/mod.ts";

export const YoSupFunction = DefineFunction(
  "yo_sup_function",
  {
    title: "Yo Sup",
    description: "Sends a message with the tea",
    input_parameters: {
      required: ["channel_id"],
      properties: {
        channel_id: {
          type: Schema.slack.types.channel_id,
          description: "The channel to post the message",
        },
        the_tea: {
          type: Schema.types.string,
          description: "The tea",
        },
      },
    },
  },
  async ({ inputs, client, env }) => {
    await client.call("chat.postMessage", {
      channel: inputs.channel_id,
      text: `The tea: ${inputs.the_tea}`,
    });

    return await {
      outputs: {},
    };
  },
);
