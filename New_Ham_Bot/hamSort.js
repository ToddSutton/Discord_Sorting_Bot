const { Guild } = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const {token, channel, public, private, interimRole, publicRole, privateRole, adminChannel} = require('./config.json');
var mute;
var deaf;
// activates on startup
client.once('ready', () => {
    mute = false;
    deaf = false;
    console.log('Ready!\n');
})

client.on('rateLimit', (rateLimitInfo) => {
    console.log(rateLimitInfo.timeout);
})

// activates when a new message appears
client.on('message', message => {
    // checks if the message is in the correct channel for sorting
    if (message.channel.id === channel){
        // checks if the user is of the appropriate role before moving them
        if (message.member.roles.highest.id === interimRole){
            // performs role switching based on what was entered into the channel
            switch (message.content){
                case public:
                    message.member.roles.set([publicRole])
                    .then(console.log("Twitch + 1"))
                    .catch(console.error);
                    break;
                case private:
                    message.member.roles.set([privateRole])
                    .then(console.log("Friend + 1"))
                    .catch(console.error);
                    break;
            }
        }
        // deletes the message entered in channel so others can't read it
        console.log(message.member.roles.highest.id + " " + message.member.user.username + ": " + message.content);
        message.delete();
    }
    // checks if message is in correct channel for admin use, and if admin is in a voice channel
    else if (message.channel.id === adminChannel && message.member.voice.channel){
        // case insensitive checking
        switch (message.content.toLowerCase()){
            // muting and deafening are await/promisary functions, they need a catch to work properly
            // need to find a way to ensure all members get affected, breaks when there's more than ten members
            case "mute":
                if (mute){
                    message.member.voice.channel.members.each(user => user.voice.setMute(false).then(console.log(user.user.username)).catch(console.error));
                }
                else{
                    message.member.voice.channel.members.each(user => user.voice.setMute(true).then(console.log(user.user.username)).catch(console.error));
                }
                mute = !mute;
                console.log("mute: " + mute + "\n");
                break;
            case "deaf":
                if (deaf){
                    message.member.voice.channel.members.each(user => user.voice.setDeaf(false).then(console.log(user.user.username)).catch(console.error));
                }
                else{
                    message.member.voice.channel.members.each(user => user.voice.setDeaf(true).then(console.log(user.user.username)).catch(console.error));
                }
                deaf = !deaf;
                console.log("deaf: " + deaf + "\n");
                break;
        }
    }
});

client.on('messageReactionAdd', (reaction, user) =>{

});

client.login(token);

async function muting(users){
    
}