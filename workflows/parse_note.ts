import { DefineWorkflow, Schema } from "slack-cloud-sdk/mod.ts";
import { ParseNoteFunction } from "../functions/parse_note.ts";

export const ParseNoteWorkflow = DefineWorkflow(
  "parse_note_workflow",
  {
    title: "Turn Note into Actions",
    description: "Takes the provided note and parses it to items of work",
    input_parameters: {
      required: ["channel_id", "note"],
      properties: {
        note_channel_id: {
          type: Schema.slack.types.channel_id,
          description: "The channel id for the note",
        },
        note_message_ts: {
          type: Schema.types.string,
          description: "The message id for the note",
        },
        note_user_id: {
          type: Schema.slack.types.user_id,
          description: "The user running this workflow",
        },
        note: {
          type: Schema.types.string,
          description: "The note to parse",
        },
      },
    },
  },
);

ParseNoteWorkflow.addStep(ParseNoteFunction, {
  note_channel_id: ParseNoteWorkflow.inputs.note_channel_id,
  note_message_ts: ParseNoteWorkflow.inputs.note_message_ts,
  note_user_id: ParseNoteWorkflow.inputs.note_user_id,
  note: ParseNoteWorkflow.inputs.note,
});
