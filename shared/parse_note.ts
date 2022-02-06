export const ParseNote = (note: string) => {
  let userTasks = note.match(/<@[A-Z0-9].*/g);
  let channelTasks = note.match(/<#[A-Z0-9].*/g);

  console.log(userTasks);
  console.log(channelTasks);
};
