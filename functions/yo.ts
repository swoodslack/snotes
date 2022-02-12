import { DefineFunction, Schema } from "slack-cloud-sdk/mod.ts";
import { callWebhook } from "../shared/utils.ts";

export const YoFunction = DefineFunction(
  "yo_function",
  {
    title: "Yo",
    description: "Sends The Tea",
    input_parameters: {
      required: ["the_tea"],
      properties: {
        the_tea: {
          type: Schema.types.string,
          description: "The tea",
        },
      },
    },
  },
  async ({ inputs, client, env }) => {
    await callWebhook(
      "https://hooks.slack.com/triggers/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",
      { "the_tea": inputs.the_tea },
    );

    return await {
      outputs: {},
    };
  },
);
