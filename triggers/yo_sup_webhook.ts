import { DefineTrigger, TriggerTypes } from "slack-cloud-sdk/mod.ts";
import { YoSupWorkflow } from "../workflows/yo_sup.ts";

export const YoSupWebhook = DefineTrigger(
  "yo_sup_webhook",
  {
    type: TriggerTypes.Webhook,
  },
)
  .runs(YoSupWorkflow)
  .availableToChannel("C030MKRPW76")
  .withInputs((ctx) => ({
    the_tea: ctx.data.the_tea,
    channel_id: "C030MKRPW76",
  }));
