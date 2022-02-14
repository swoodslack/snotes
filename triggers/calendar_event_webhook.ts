import { DefineTrigger, TriggerTypes } from "slack-cloud-sdk/mod.ts";
import { CalendarEventWorkflow } from "../workflows/calendar_event.ts";

export const CalendarEventWebhook = DefineTrigger(
  "calendar_event_webhook",
  {
    type: TriggerTypes.Webhook,
  },
)
  .runs(CalendarEventWorkflow)
  .availableToChannel("C032UTA7JUS")
  .withInputs((ctx) => ({
    event_link: ctx.data.event_link,
    summary: ctx.data.summary,
    attendees: ctx.data.attendees,
  }));
