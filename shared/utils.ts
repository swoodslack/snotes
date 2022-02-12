export const getLinkToMessage = async (
  client: any,
  channelId: string,
  messageTs: string,
): Promise<string> => {
  //console.log(`Getting permalink for: ${channelId} / ${messageTs}`);
  const result = await client.call("chat.getPermalink", {
    channel: channelId,
    message_ts: messageTs,
  });
  //console.log(result);
  return result.permalink;
};
