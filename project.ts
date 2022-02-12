import { Project } from "slack-cloud-sdk/mod.ts";

import { CreateAgendaFunction } from "./functions/create_agenda.ts";
import { CreateAgendaWorkflow } from "./workflows/create_agenda.ts";
import { CreateAgendaShortcut } from "./triggers/create_agenda_shortcut.ts";

import { ParseNoteFunction } from "./functions/parse_note.ts";
import { ParseNoteWorkflow } from "./workflows/parse_note.ts";
import { ParseNoteMessageShortcut } from "./triggers/parse_note_message_shortcut.ts";

import { YoSupFunction } from "./functions/yo_sup.ts";
import { YoSupWorkflow } from "./workflows/yo_sup.ts";
import { YoSupWebhook } from "./triggers/yo_sup_webhook.ts";

import { YoFunction } from "./functions/yo.ts";
import { YoWorkflow } from "./workflows/yo.ts";
import { YoShortcut } from "./triggers/yo_shortcut.ts";

import { UpdateItemFunction } from "./functions/update_item.ts";
import { UpdateItemWorkflow } from "./workflows/update_item.ts";
import { UpdateItemEventReactji1 } from "./triggers/update_item_event_reactji_1.ts";
import { UpdateItemEventReactji2 } from "./triggers/update_item_event_reactji_2.ts";
import { UpdateItemEventReactji3 } from "./triggers/update_item_event_reactji_3.ts";

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
    "channels:read",
    "channels:history",
    "groups:read",
    "groups:write",
    "groups:history",
    "mpim:read",
    "mpim:write",
    "mpim:history",
    "im:read",
    "im:write",
    "im:history",
  ],
  functions: [
    ParseNoteFunction,
    CreateAgendaFunction,
    UpdateItemFunction,
    YoSupFunction,
    YoFunction,
  ],
  workflows: [
    ParseNoteWorkflow,
    CreateAgendaWorkflow,
    UpdateItemWorkflow,
    YoSupWorkflow,
    YoWorkflow,
  ],
  triggers: [
    ParseNoteMessageShortcut,
    CreateAgendaShortcut,
    UpdateItemEventReactji1,
    UpdateItemEventReactji2,
    UpdateItemEventReactji3,
    YoSupWebhook,
    YoShortcut,
  ],
  tables: [Items, Notes],
  outgoingDomains: [],
});
