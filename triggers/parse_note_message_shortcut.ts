import { DefineTrigger, TriggerTypes } from "slack-cloud-sdk/mod.ts";
import { ParseNoteWorkflow } from "../workflows/parse_note.ts";

export const ParseNoteMessageShortcut = DefineTrigger(
  "parse_note_message_shortcut",
  {
    type: TriggerTypes.MessageShortcut,
    name: "Turn Note into Actions",
    description: "Takes the provided note and parses it to items of work",
  },
)
  .runs(ParseNoteWorkflow)
  .withInputs((ctx) => ({
    note_channel_id: ctx.data.channel_id,
    note_message_ts: ctx.data.message.ts,
    note_user_id: ctx.data.user_id,
    note: ctx.data.message.text,
  }));
