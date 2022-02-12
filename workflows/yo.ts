import { DefineWorkflow, Schema } from "slack-cloud-sdk/mod.ts";
import { YoFunction } from "../functions/yo.ts";

export const YoWorkflow = DefineWorkflow(
  "yo_workflow",
  {
    title: "Yo",
    description: "Sends the tea",
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
);

YoWorkflow.addStep(YoFunction, {
  the_tea: YoWorkflow.inputs.the_tea,
});
