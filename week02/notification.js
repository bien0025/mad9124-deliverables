const EventEmitter = require('events');

class Notification extends EventEmitter {
    constructor(channelName) {
        super();
        this.channel = channel;
        this.on(channelName, (message) => {
            console.log(channelName, message);
        });
    }
    send(message) {
        this.emit(this.channel, message);
    }
}

const myTwitchChannel = new Notification('TWITCH');
const myYoutubeChannel = new Notification('YOUTUBE');

