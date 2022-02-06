export interface Item {
  note_channel_id: string;
  note_message_ts: string;
  item_channel_id?: string;
  item_message_ts?: string;
  type: string;
  summary: string;
  content?: string;
  who?: string;
  where?: string;
  when?: number;
  isImportant: boolean;
  isUrgent: boolean;
}

export interface Reference {
  reference?: string;
}
