import { DefineTrigger, TriggerTypes } from "slack-cloud-sdk/mod.ts";
import { YoWorkflow } from "../workflows/yo.ts";

export const YoShortcut = DefineTrigger("yo_shortcut", {
  type: TriggerTypes.Shortcut,
  name: "Yo",
  description: "Sends the tea",
})
  .runs(YoWorkflow);
