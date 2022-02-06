import { DefineTrigger, TriggerTypes } from "slack-cloud-sdk/mod.ts";
import { ParseNoteWorkflow } from "../workflows/parse_note.ts";

export const ParseNoteShortcut = DefineTrigger("parse_note", {
  type: TriggerTypes.Shortcut,
  name: "Parse Note",
  description: "Takes the provided note and parses it to items of work",
})
  .runs(ParseNoteWorkflow)
  .withInputs((ctx) => ({
    note_channel_id: ctx.data.channel_id,
    note_message_ts: {
      value: "",
      hidden: true,
    },
  }));
