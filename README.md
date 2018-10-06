# Rating-bot

Rating bot was a Discord bot written for some other project so that they could use it for a rating system where people could check their ratings and rating editors could give reputation to those specfic people.


The bot is pretty fast and can generate real-time chart, it also uses JSON for data storage of all the usernames with their chart data. As this was created for other project, you may need to edit a lot of stuff like go through every command, change roles and chart data.

It has the following commands:

Note: Prefix is "~"

1. updateall: This command is pretty fast and can update people with specfic roles, also add their chart data to the JSON file.

The project I created this bot for used the roles "Developer" and "Designer" which also means there is two JSON files which is meant only for the Developer data and another one is only meant for the Designer data.

2. rating: This command can be pretty useful to check your own rating, it works by grabbing the data from the JSON file and display it in a chart.

3. updatedeveloper: It has a role permission for a role called "Rating Editor" meaning people with those specific roles can use it, but if you have enough experience you can change these stuff. Anyway, the command has three parameters: username, reputation and field. In the first parameter you will have to mention the username, in the second parameter you will have to write the number of rep and in the third you will have to write a field name meaning the data field that is stored in JSON will get updated.

4. updatedesigner: As I said it was made for two roles, you can modify it for your own advantage, anyway it is just like the updatedeveloper command.

5. checkstats: This can be used to check the chart data of a specfic user by just mentioning him/her.

You can make changes in the script if you are experienced enough and for any help you may contact me on Discord: Dev#3728

The required modules are:

Anychart

discord.js

fs-extra

jsonfile

The fun part was the data management through JSON and it really worked out well, you may also use SQLITE to make the data management process even more reliable.
