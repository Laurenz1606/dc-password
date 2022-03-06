const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  ],
});

require("express")()
  .get("/", (_, res) => res.send("Works"))
  .listen(80);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  try {
    if (message.content.startsWith("!password")) {
      const length = parseInt(args(message.content)[1]) || 32;
      const qty = parseInt(args(message.content)[2]) || 1;
      await message.channel.send(
        new Array(qty)
          .fill(0)
          .map(() => getpass(length))
          .join("\n"),
      );
    }
  } catch (error) {
    console.log(error);
  }
});

function args(arg) {
  return arg.split(" ");
}

function getpass(passLength) {
  const chars =
    "0123456789abcdefghikjlmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let pass = "";
  for (let i = 0; i < passLength; i++) {
    const randPass = Math.floor(Math.random() * chars.length);
    pass += chars.substring(randPass, randPass + 1);
  }
  return pass;
}

client.login(process.env.TOKEN);
