const logEvent = require("./logEvents");

const EventEmitter = require("events");

// This also allows you to add custom methods or properties specific to your MyEmitter class.
// if you are not plaining to add custome functions you can ignore the creating of this class
class MyEmitter extends EventEmitter {}

// Initialize Object
const myEmitter = new MyEmitter();

// Add a listener for the Log event
// You can register listeners for specific events using the "on" or "addListener"
// A listener is a function that gets executed when the associated event is emitted.
// You can use the once method to register a listener that will be executed only once for a specific event.
// You can remove a specific listener for an event using the removeListener method.
myEmitter.on("log", msg => {
  logEvent(msg);
});

setTimeout(() => {
  //Emit event
  myEmitter.emit("log", "Log event emitted !");
}, 2000);
