import { DefineWorkflow, Schema } from "slack-cloud-sdk/mod.ts";
import { YoSupFunction } from "../functions/yo_sup.ts";

export const YoSupWorkflow = DefineWorkflow(
  "yo_sup_workflow",
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
);

YoSupWorkflow.addStep(YoSupFunction, {
  channel_id: YoSupWorkflow.inputs.channel_id,
  the_tea: YoSupWorkflow.inputs.the_tea,
});
