const Discord = require("discord.js");

const client = new Discord.Client();

const prefix = '~';

var fs = require('fs-extra');

var jf = require('jsonfile');

client.on("ready", () => {
    console.log("I am ready!");
})

client.on("message", (message) => {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;

    var config = JSON.parse(require('fs').readFileSync('./data.json', 'utf8'));
    var config1 = JSON.parse(require('fs').readFileSync('./data1.json', 'utf8'));

    if (message.content.startsWith(prefix + "updateall")) {
        let cool5 = msg.guild.roles.find("name", "Owner");
        if (message.member.roles.has(cool5.id)) {
            let membersWithRole = message.guild.members.filter(member => {
                return member.roles.find("name", "Developers");
            }).map(member => {
                return member.user.username;
            })
            let membersWithRole1 = message.guild.members.filter(member => {
                return member.roles.find("name", "Designers");
            }).map(member => {
                return member.user.username;
            })
            if (membersWithRole.join("\n")) {
                var array1 = membersWithRole.join(",");
                var split = array1.split(',');
                split.forEach(function(element) {
                    if (!config[element]) {
                        config[element] = {
                            websites: 0,
                            registers: 0,
                            setup: 0,
                            security: 0,
                            coding: 0
                        };
                        fs.writeFile('./data.json', JSON.stringify(config, null, 4), 'utf8', function(err) {
                            if (err) return;
                        });
                    }
                });
                message.channel.send(" Successfully updated " + split.length + " people with developer role ");
            }
            if (membersWithRole1.join("\n")) {
                var array1 = membersWithRole1.join(",");
                var split = array1.split(',');
                split.forEach(function(element) {
                    if (!config1[element]) {
                        config1[element] = {
                            rooms: 0,
                            items: 0,
                            catalogs: 0,
                            newspapers: 0,
                            gfxlogo: 0
                        };
                        fs.writeFile('./data1.json', JSON.stringify(config1, null, 4), 'utf8', function(err) {
                            if (err) return;
                        });
                    }
                });
                message.channel.send(" Successfully updated " + split.length + " people with designer role ");
            }
        }
    }


    if (message.content.startsWith(prefix + "rating")) {
        let cool = message.guild.roles.find("name", "Developers");
        let cool1 = message.guild.roles.find("name", "Designers");
        var username = message.author.username;

        if (message.member.roles.has(cool.id) && message.member.roles.has(cool1.id)) {
            var username = message.author.username;

            var anychart = require('anychart')(window);
            var anychartExport = require('anychart-nodejs')(anychart);

            anychart.format.locales.default.numberLocale.decimalsCount = 2;
            anychart.format.locales.default.numberLocale.scale = true;
            try {
                var chart = anychart.bar();
                var rooms = config1[message.author.username].rooms;
                var items = config1[message.author.username].items;
                var catalogs = config1[message.author.username].catalogs;
                var newspapers = config1[message.author.username].newspapers;
                var gfxlogo = config1[message.author.username].gfxlogo;
                var websites = config[message.author.username].websites;
                var registers = config[message.author.username].registers;
                var setup = config[message.author.username].setup;
                var security = config[message.author.username].security;
                var coding = config[message.author.username].coding;
                var chart = anychart.column([{
                        x: "Rooms",
                        value: rooms
                    },
                    {
                        x: "Items",
                        value: items
                    },
                    {
                        x: "Catalogs",
                        value: catalogs
                    },
                    {
                        x: "Newspapers",
                        value: newspapers
                    },
                    {
                        x: "GFX",
                        value: gfxlogo
                    },
                    {
                        x: "Websites",
                        value: websites
                    },
                    {
                        x: "Registers",
                        value: registers
                    },
                    {
                        x: "Setups",
                        value: setup
                    },
                    {
                        x: "Security",
                        value: security
                    },
                    {
                        x: "Coding",
                        value: coding
                    }
                ]);
            } catch (e) {
                return;
            }
            chart.bounds(0, 0, 800, 600);
            var background = chart.background();
            background.stroke("2 #4169E1");
            background.corners(10);
            background.fill({
                keys: [
                    "#FFECB3 0.2",
                    "#FFE082",
                    "#FFECB3 0.2"
                ],
                angle: -90
            });
            var pointCount = chart.getStat("dataPlotYAverage");
            chart.title(" Overall rating: " + Math.round(pointCount) + `\n` + message.author.username);
            chart.maxPointWidth(35);
            chart.container('container');
            chart.draw();
            anychartExport.exportTo(chart, 'png').then(function(image) {
                message.channel.send("Cool! You seem to have the designer and developer chart both, so here is the stats report with both of the ranks:", {
                    file: image
                });
            }, function(generationError) {
                console.log(generationError);
            });
            return;
        }

        if (message.member.roles.has(cool.id)) {
            var username = message.author.username;
           
            var anychart = require('anychart')(window);
            var anychartExport = require('anychart-nodejs')(anychart);
            var websites = config[message.author.username].websites;
            var registers = config[message.author.username].registers;
            var setup = config[message.author.username].setup;
            var security = config[message.author.username].security;
            var coding = config[message.author.username].coding;
            try {
                var chart = anychart.bar();
                var test = config[message.author.username].devdata;
                var chart = anychart.column([{
                        x: "Websites",
                        value: websites
                    },
                    {
                        x: "Registers",
                        value: registers
                    },
                    {
                        x: "Setups",
                        value: setup
                    },
                    {
                        x: "Security",
                        value: security
                    },
                    {
                        x: "Coding",
                        value: coding
                    }
                ]);
            } catch (e) {
                return;
            }
            chart.bounds(0, 0, 800, 600);
            var background = chart.background();
            background.stroke("2 #2196F3");
            background.corners(10);
            background.fill({
                keys: [
                    "#FFECB3 0.2",
                    "#FFE082",
                    "#FFECB3 0.2"
                ],
                angle: -90
            });

            var pointCount = chart.getStat("dataPlotYAverage");
            chart.title(" Overall rating: " + Math.round(pointCount) + `\n` + message.author.username);
            chart.maxPointWidth(35);
            chart.container('container');
            chart.draw();
            anychartExport.exportTo(chart, 'png').then(function(image) {
                message.channel.send("You only seem to have the developer chart, here is your stats report:", {
                    file: image
                });
            }, function(generationError) {
                console.log(generationError);
            });
        }

        if (message.member.roles.has(cool1.id)) {
            var username = message.author.username;
           
            var anychart = require('anychart')(window);
            var anychartExport = require('anychart-nodejs')(anychart);
            var rooms = config1[message.author.username].rooms;
            var items = config1[message.author.username].items;
            var catalogs = config1[message.author.username].catalogs;
            var newspapers = config1[message.author.username].newspapers;
            var gfxlogo = config1[message.author.username].gfxlogo;
            try {
                var chart = anychart.bar();
                var test = config1[message.author.username].designerdata;
                var chart = anychart.column([{
                        x: "Rooms",
                        value: rooms
                    },
                    {
                        x: "Items",
                        value: items
                    },
                    {
                        x: "Catalogs",
                        value: catalogs
                    },
                    {
                        x: "Newspapers",
                        value: newspapers
                    },
                    {
                        x: "GFX",
                        value: gfxlogo
                    }
                ]);
            } catch (e) {
                return;
            }
            chart.bounds(0, 0, 800, 600);
            var background = chart.background();
            background.stroke("2 #73EC4E");
            background.corners(10);
            background.fill({
                keys: [
                    "#FFECB3 0.2",
                    "#FFE082",
                    "#FFECB3 0.2"
                ],
                angle: -90
            });

            var pointCount = chart.getStat("dataPlotYAverage");
            chart.title(" Overall rating: " + Math.round(pointCount) + `\n` + message.author.username);
            chart.maxPointWidth(35);
            chart.container('container');
            chart.draw();
            anychartExport.exportTo(chart, 'png').then(function(image) {
                message.channel.send("You only seem to have the designer chart, here is your stats report:", {
                    file: image
                });
            }, function(generationError) {
                console.log(generationError);
            });
        }

        if (!message.member.roles.has(cool.id) && !message.member.roles.has(cool1.id)) {
            message.channel.send('Well, looks like you do not have a chart nor a role');
        }

    }

    if (message.content.startsWith(prefix + "updatedeveloper")) {
        let cool5 = msg.guild.roles.find("name", "Rating Editor");
        if (message.member.roles.has(cool5.id)) {
            var ui = message.mentions.users.first();
            var suffix = message.content.split(" ").slice(1).join(" ");
            const args = message.content.slice(" ").trim().split(/ +/g);
            if (!args[3]) return message.channel.send('Please write the number of rep');
            if (!args[2]) return message.channel.send('Please write the field you want to rep');
            if (isNaN(args[3])) return message.channel.send('It has to be a number!');
            if (!ui) {
                message.channel.send("Please mention a user");
            } else {
                if (!config[ui.username]) {
                    message.channel.send("The user needs to generate his own chart first!");
                } else {
                    if (args[2] === 'websites') {
                        config[ui.username].websites = parseInt(config[ui.username].websites) + parseInt(args[3]);
                        fs.writeFileSync('./data.json', JSON.stringify(config, null, 4));
                        message.channel.send("Success!");
                    } else if (args[2] === 'registers') {
                        config[ui.username].registers = parseInt(config[ui.username].registers) + parseInt(args[3]);
                        fs.writeFileSync('./data.json', JSON.stringify(config, null, 4));
                        message.channel.send("Success!");
                    } else if (args[2] === 'setup') {
                        config[ui.username].setup = parseInt(config[ui.username].setup) + parseInt(args[3]);
                        fs.writeFileSync('./data.json', JSON.stringify(config, null, 4));
                        message.channel.send("Success!");
                    } else if (args[2] === 'security') {
                        config[ui.username].security = parseInt(config[ui.username].security) + parseInt(args[3]);
                        fs.writeFileSync('./data.json', JSON.stringify(config, null, 4));
                        message.channel.send("Success!");
                    } else if (args[2] === 'coding') {
                        config[ui.username].coding = parseInt(config[ui.username].coding) + parseInt(args[3]);
                        fs.writeFileSync('./data.json', JSON.stringify(config, null, 4));
                        message.channel.send("Success!");
                    } else {
                        message.channel.send('Are you sure its the correct field?');
                    }
                }
            }
        }
    }

    if (message.content.startsWith(prefix + "updatedesigner")) {
        let cool5 = msg.guild.roles.find("name", "Rating Editor");
        if (message.member.roles.has(cool5.id)) {
            var ui = message.mentions.users.first();
            var suffix = message.content.split(" ").slice(1).join(" ");
            const args = message.content.slice(" ").trim().split(/ +/g);
            if (!args[3]) return message.channel.send('Please write the number of rep');
            if (!args[2]) return message.channel.send('Please write the field you want to rep');
            if (isNaN(args[3])) return message.channel.send('It has to be a number!');
            if (!ui) {
                message.channel.send("Please mention a user");
            } else {
                if (!config1[ui.username]) {
                    message.channel.send("The user needs to generate his own chart first!");
                } else {
                    if (args[2] === 'rooms') {
                        config1[ui.username].rooms = parseInt(config1[ui.username].rooms) + parseInt(args[3]);
                        fs.writeFileSync('./data1.json', JSON.stringify(config1, null, 4));
                        message.channel.send("Success!");
                    } else if (args[2] === 'items') {
                        config1[ui.username].items = parseInt(config1[ui.username].items) + parseInt(args[3]);
                        fs.writeFileSync('./data1.json', JSON.stringify(config1, null, 4));
                        message.channel.send("Success!");
                    } else if (args[2] === 'catalogs') {
                        config1[ui.username].catalogs = parseInt(config1[ui.username].catalogs) + parseInt(args[3]);
                        fs.writeFileSync('./data1.json', JSON.stringify(config1, null, 4));
                        message.channel.send("Success!");
                    } else if (args[2] === 'newspapers') {
                        config1[ui.username].newspapers = parseInt(config1[ui.username].newspapers) + parseInt(args[3]);
                        fs.writeFileSync('./data1.json', JSON.stringify(config1, null, 4));
                        message.channel.send("Success!");
                    } else if (args[2] === 'gfx') {
                        config1[ui.username].gfxlogo = parseInt(config1[ui.username].gfxlogo) + parseInt(args[3]);
                        fs.writeFileSync('./data1.json', JSON.stringify(config1, null, 4));
                        message.channel.send("Success!");
                    } else {
                        message.channel.send('Are you sure its the correct field?');
                    }
                }
            }
        }
    }

    if (message.content.startsWith(prefix + "checkstats")) {
        var ui = message.mentions.users.first();
        const args = message.content.slice(" ").trim().split(/ +/g);
        if (!ui) {
            message.channel.send("Please mention a user");
        } else {
            if (config[ui.username] && config1[ui.username]) {
                var username = message.author.username;
             
                var anychart = require('anychart')(window);
                var anychartExport = require('anychart-nodejs')(anychart);

                anychart.format.locales.default.numberLocale.decimalsCount = 2;
                anychart.format.locales.default.numberLocale.scale = true;
                try {
                    var chart = anychart.bar();
                    var rooms = config1[ui.username].rooms;
                    var items = config1[ui.username].items;
                    var catalogs = config1[ui.username].catalogs;
                    var newspapers = config1[ui.username].newspapers;
                    var gfxlogo = config1[ui.username].gfxlogo;
                    var websites = config[ui.username].websites;
                    var registers = config[ui.username].registers;
                    var setup = config[ui.username].setup;
                    var security = config[ui.username].security;
                    var coding = config[ui.username].coding;
                    var chart = anychart.column([{
                            x: "Rooms",
                            value: rooms
                        },
                        {
                            x: "Items",
                            value: items
                        },
                        {
                            x: "Catalogs",
                            value: catalogs
                        },
                        {
                            x: "Newspapers",
                            value: newspapers
                        },
                        {
                            x: "GFX",
                            value: gfxlogo
                        },
                        {
                            x: "Websites",
                            value: websites
                        },
                        {
                            x: "Registers",
                            value: registers
                        },
                        {
                            x: "Setups",
                            value: setup
                        },
                        {
                            x: "Security",
                            value: security
                        },
                        {
                            x: "Coding",
                            value: coding
                        }
                    ]);
                } catch (e) {
                    return;
                }
                chart.bounds(0, 0, 800, 600);
                var background = chart.background();
                background.stroke("2 #4169E1");
                background.corners(10);
                background.fill({
                    keys: [
                        "#FFECB3 0.2",
                        "#FFE082",
                        "#FFECB3 0.2"
                    ],
                    angle: -90
                });
                var pointCount = chart.getStat("dataPlotYAverage");
                chart.title(" Overall rating: " + Math.round(pointCount) + `\n` + ui.username);
                chart.maxPointWidth(35);
                chart.container('container');
                chart.draw();
                anychartExport.exportTo(chart, 'png').then(function(image) {
                    message.channel.send("Cool! The user has the designer and developer chart both, so here is the stats report with both of the ranks:", {
                        file: image
                    });
                }, function(generationError) {
                    console.log(generationError);
                });
                return;
            }

            if (config[ui.username]) {
                var username = message.author.username;
                var JSDOM = require('jsdom').JSDOM;
                var jsdom = new JSDOM('<body><div id="container"></div></body>', {
                    runScripts: 'dangerously'
                });
                var window = jsdom.window;


                var anychart = require('anychart')(window);
                var anychartExport = require('anychart-nodejs')(anychart);
                var websites = config[ui.username].websites;
                var registers = config[ui.username].registers;
                var setup = config[ui.username].setup;
                var security = config[ui.username].security;
                var coding = config[ui.username].coding;
                try {
                    var chart = anychart.bar();
                    var test = config[message.author.username].devdata;
                    var chart = anychart.column([{
                            x: "Websites",
                            value: websites
                        },
                        {
                            x: "Registers",
                            value: registers
                        },
                        {
                            x: "Setups",
                            value: setup
                        },
                        {
                            x: "Security",
                            value: security
                        },
                        {
                            x: "Coding",
                            value: coding
                        }
                    ]);
                } catch (e) {
                    return;
                }
                chart.bounds(0, 0, 800, 600);
                var background = chart.background();
                background.stroke("2 #2196F3");
                background.corners(10);
                background.fill({
                    keys: [
                        "#FFECB3 0.2",
                        "#FFE082",
                        "#FFECB3 0.2"
                    ],
                    angle: -90
                });

                var pointCount = chart.getStat("dataPlotYAverage");
                chart.title(" Overall rating: " + Math.round(pointCount) + `\n` + ui.username);
                chart.maxPointWidth(35);
                chart.container('container');
                chart.draw();
                anychartExport.exportTo(chart, 'png').then(function(image) {
                    message.channel.send("As the user only has the developer chart, here is his stats report:", {
                        file: image
                    });
                }, function(generationError) {
                    console.log(generationError);
                });
            }

            if (config1[ui.username]) {
                var username = message.author.username;
                var JSDOM = require('jsdom').JSDOM;
                var jsdom = new JSDOM('<body><div id="container"></div></body>', {
                    runScripts: 'dangerously'
                });
                var window = jsdom.window;


                var anychart = require('anychart')(window);
                var anychartExport = require('anychart-nodejs')(anychart);
                var rooms = config1[ui.username].rooms;
                var items = config1[ui.username].items;
                var catalogs = config1[ui.username].catalogs;
                var newspapers = config1[ui.username].newspapers;
                var gfxlogo = config1[ui.username].gfxlogo;
                try {
                    var chart = anychart.bar();
                    var test = config1[ui.username].designerdata;
                    var chart = anychart.column([{
                            x: "Rooms",
                            value: rooms
                        },
                        {
                            x: "Items",
                            value: items
                        },
                        {
                            x: "Catalogs",
                            value: catalogs
                        },
                        {
                            x: "Newspapers",
                            value: newspapers
                        },
                        {
                            x: "GFX",
                            value: gfxlogo
                        }
                    ]);
                } catch (e) {
                    return;
                }
                chart.bounds(0, 0, 800, 600);
                var background = chart.background();
                background.stroke("2 #73EC4E");
                background.corners(10);
                background.fill({
                    keys: [
                        "#FFECB3 0.2",
                        "#FFE082",
                        "#FFECB3 0.2"
                    ],
                    angle: -90
                });

                var pointCount = chart.getStat("dataPlotYAverage");
                chart.title(" Overall rating: " + Math.round(pointCount) + `\n` + ui.username);
                chart.maxPointWidth(35);
                chart.container('container');
                chart.draw();
                anychartExport.exportTo(chart, 'png').then(function(image) {
                    message.channel.send("As the user only has the the designer chart, here is his stats report:", {
                        file: image
                    });
                }, function(generationError) {
                    console.log(generationError);
                });
            }
        }
    }
}

});

client.login("");
