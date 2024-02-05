const { format } = require("date-fns");
const { v4: uuid } = require("uuid"); // v4: uuid: V4 is the function adn uuid is an alias

console.log(format(new Date(), "dd/MM/yyyy\tHH:mm:ss"));
console.log(uuid());
console.log(uuid());
