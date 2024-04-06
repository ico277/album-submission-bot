const fs = require("fs");

module.exports = {
    run: async (client, interaction) => {
        let channel = interaction.options.getChannel("announce-channel", true);
        let role = interaction.options.getRole("notify-ping");

        if (!channel.isTextBased()) {
            await interaction.reply("The announce channel has to be text based!");
            return;
        }

        if (fs.existsSync(`./config/${interaction.guildId}.json`)) {
            fs.writeFileSync();
        }
    },

    help: {
        "random garbage": "meow meow nya"
    }
}
