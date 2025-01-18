const EventEmitter = require('events');
const myEmitter = new EventEmitter();

//define an event listener

myEmitter.on('test', () => {
    console.log('test event has been emitted');
});

myEmitter.emit('test1');
myEmitter.emit('test1');
myEmitter.emit('test1');
myEmitter.emit('test1');
myEmitter.emit('test1');

myTwitchChannel.on('TWITCH', (message) => {
    log('TWITCH:', message);
});
myYoutubeChannel.on('YOUTUBE', (message) => {
    log('YOUTUBE:', message);
});