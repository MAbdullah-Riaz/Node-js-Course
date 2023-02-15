const EventEmitter = require('events');
var ulr = 'http://mylogger.io/log';
class Logger extends EventEmitter {
  log(message) {
    console.log(message);

    //Raise an event
    this.emit('messageLogged', { id: 4, url: 'http//' });
  }
}

module.exports = Logger;
