// export const dispatchItem = async (
//   client: any,
//   env: any,
//   note_channel_id: string,
//   note_message_ts: string,
//   type: string,
//   summary: string,
//   who: string,
//   where: string,
//   when: number,
//   content: string,
//   is_important: boolean,
//   is_urgent: boolean,
// ) => {
//   // Determine where to post this item - to the 'where', unless we just
//   // have the 'who' - in which case we want to send a DM
//   let item_channel_id = who;
//   if (where !== null && where.trim().length > 0) {
//     item_channel_id = where;
//   }

//   const result = await client.call("chat.postMessage", {
//     /*thread_ts: note_message_ts,*/
//     channel: item_channel_id,
//     blocks: [
//       {
//         "type": "section",
//         "text": {
//           "type": "mrkdwn",
//           "text": "You have a new *" + type + "*:\n" + summary,
//         },
//         "accessory": {
//           "type": "image",
//           "image_url": "../assets/task.png",
//           "alt_text": "calendar thumbnail",
//         },
//       },
//       {
//         "type": "divider",
//       },
//       {
//         "type": "section",
//         "fields": [
//           {
//             "type": "mrkdwn",
//             "text": "*Who:*\n" + who,
//           },
//           {
//             "type": "mrkdwn",
//             "text": "*Where:*\n" + where,
//           },
//           {
//             "type": "mrkdwn",
//             "text": "*Important:*\n" + is_important,
//           },
//           {
//             "type": "mrkdwn",
//             "text": "*Urgent:*\n" + is_urgent,
//           },
//           {
//             "type": "mrkdwn",
//             "text": "*When:*\n" + when,
//           },
//         ],
//       },
//       {
//         "type": "divider",
//       },
//       {
//         "type": "section",
//         "text": {
//           "type": "mrkdwn",
//           "text": "*Content:*\n" + content,
//         },
//       },
//     ],
//     metadata: {
//       event_type: "item_created",
//       event_payload: {
//         note_channel_id: note_channel_id,
//         note_message_ts: note_message_ts,
//         type: type,
//         summary: summary,
//         who: who,
//         where: where,
//         when: when,
//         content: content,
//         is_important: is_important,
//         is_urgent: is_urgent,
//       },
//     },
//   });

//   // Return information about where the item was posted
//   return {
//     item_channel_id: item_channel_id,
//     item_message_ts: result.message.id,
//   };
// };
