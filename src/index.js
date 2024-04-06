require('dotenv').config();
const { REST, Routes, Client, GatewayIntentBits } = require("discord.js");
const { commands } = require("./commands.json");

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Started refreshing application (/) commands.");

        rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();

// Afterwards we can create a quite simple example bot:

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;
    interaction.options.getChannel("announce-channel", true).isTextBased();
    try {
        let cmd = require(`./cmds/${interaction.commandName.replace(/[^a-zA-Z]/g, '')}.js`)
        await cmd.run(client, interaction);
    } catch (err) {
        if (!interaction.replied) {
            await interaction.reply("There was an error executing this command!");
        }
        console.error(err);
    }
});

client.login(process.env.TOKEN);