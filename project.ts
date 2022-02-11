import { Project } from "slack-cloud-sdk/mod.ts";
import { CreateAgendaFunction } from "./functions/create_agenda.ts";
import { ParseNoteFunction } from "./functions/parse_note.ts";
import { UpdateItemFunction } from "./functions/update_item.ts";
import { CreateAgendaWorkflow } from "./workflows/create_agenda.ts";
import { ParseNoteWorkflow } from "./workflows/parse_note.ts";
import { UpdateItemWorkflow } from "./workflows/update_item.ts";
import { CreateAgendaShortcut } from "./triggers/create_agenda_shortcut.ts";
import { ParseNoteMessageShortcut } from "./triggers/parse_note_message_shortcut.ts";
//import { UpdateItemEventReactji } from "./triggers/update_item_event_reactji.ts";
import { Items } from "./tables/items.ts";
import { Notes } from "./tables/notes.ts";

Project({
  name: "Snotes",
  description: "A productivity app for note takers in Slack",
  icon: "assets/icon.png",
  runtime: "deno1.x",
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "tables:read",
    "tables:write",
  ],
  functions: [ParseNoteFunction, CreateAgendaFunction, UpdateItemFunction],
  workflows: [ParseNoteWorkflow, CreateAgendaWorkflow, UpdateItemWorkflow],
  triggers: [
    ParseNoteMessageShortcut,
    CreateAgendaShortcut,
    /*UpdateItemEventReactji,*/
  ],
  tables: [Items, Notes],
  outgoingDomains: [],
});
