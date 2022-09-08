const { ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    client.user.setActivity("the labyrinth", {
      type: ActivityType.Competing,
    });
    client.user.setStatus("idle");

    console.log(`${client.user.tag} is ready boiiiii`);
  },
};
