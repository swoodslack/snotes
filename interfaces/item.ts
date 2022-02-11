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
}

export interface Reference {
  reference?: string;
}
