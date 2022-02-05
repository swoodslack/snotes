import { Project } from "slack-cloud-sdk/mod.ts";
import { PostItemFunction } from "./functions/post_item.ts";
import { ParseNoteFunction } from "./functions/parse_note.ts";
import { PostItemWorkflow } from "./workflows/post_item.ts";
import { ParseNoteWorkflow } from "./workflows/parse_note.ts";
import { PostItemShortcut } from "./triggers/post_item_shortcut.ts";
import { ParseNoteShortcut } from "./triggers/parse_note_shortcut.ts";
import { ParseNoteMessageShortcut } from "./triggers/parse_note_message_shortcut.ts";

Project({
  name: "Snotes",
  description: "A productivity app for note takers in Slack",
  icon: "assets/icon.png",
  runtime: "deno1.x",
  botScopes: ["commands", "chat:write", "chat:write.public"],
  functions: [PostItemFunction, ParseNoteFunction],
  workflows: [PostItemWorkflow, ParseNoteWorkflow],
  triggers: [PostItemShortcut, ParseNoteShortcut, ParseNoteMessageShortcut],
  tables: [],
  outgoingDomains: [],
});
