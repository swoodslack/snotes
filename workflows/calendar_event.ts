import { DefineWorkflow, Schema } from "slack-cloud-sdk/mod.ts";
import { CalendarEventFunction } from "../functions/calendar_event.ts";

export const CalendarEventWorkflow = DefineWorkflow(
  "calendar_event_workflow",
  {
    title: "Notify about Calendar Event",
    description: "Used to notify when there's an upcoming calendar event",
    input_parameters: {
      required: ["attendees", "summary", "event_link"],
      properties: {
        summary: {
          type: Schema.types.string,
          description: "The event summary",
        },
        event_link: {
          type: Schema.types.string,
          description: "The event link",
        },
        attendees: {
          type: Schema.types.string,
          description: "The attendees",
        },
      },
    },
  },
);

CalendarEventWorkflow.addStep(CalendarEventFunction, {
  summary: CalendarEventWorkflow.inputs.summary,
  event_link: CalendarEventWorkflow.inputs.event_link,
  attendees: CalendarEventWorkflow.inputs.attendees,
});
