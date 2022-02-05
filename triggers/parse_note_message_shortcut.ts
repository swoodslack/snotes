import { DefineTrigger, TriggerTypes } from "slack-cloud-sdk/mod.ts";
import { ParseNoteWorkflow } from "../workflows/parse_note.ts";

export const ParseNoteMessageShortcut = DefineTrigger(
  "parse_note_message_shortcut",
  {
    type: TriggerTypes.MessageShortcut,
    name: "Parse Note",
    description: "Takes the provided note and parses it to items of work",
  },
)
  .runs(ParseNoteWorkflow)
  .withInputs((ctx) => ({
    channel_id: ctx.data.channel_id,
    message_id: ctx.data.message.ts,
    tags: [ctx.data.channel_id],
    note: ctx.data.message.text,
  }));
