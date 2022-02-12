export interface Item {
  note_channel_id: string;
  note_message_ts: string;
  item_channel_id?: string;
  item_message_ts?: string;
  type: string;
  summary: string;
  who?: string;
  where?: string;
  when?: number;
  permalink?: string;
  status?: string;
}

export interface ItemRow {
  note_message_ts: string;
  item_message_ts?: string;
  type: string;
  who?: string;
  where?: string;
  when?: number;
  status?: string;
  json: string;
}

export interface Reference {
  reference?: string;
}
