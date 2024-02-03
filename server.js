myVariable = "Hakmoune El Mahdi";
console.log(global.myVariable);

const os = require("os");
console.log(os.type()); // Windows_NT
console.log(os.version()); // Windows 7 Professional Service Pack 1
console.log(os.homedir()); // C:\Users\mehdi

console.log(__dirname); //  C: \Users\mehdi\Documents\Nodejs2024
console.log(__filename); // C:\Users\mehdi\Documents\Nodejs2024\server.js

const path = require("path");
console.log(path.dirname(__filename)); //  C: \Users\mehdi\Documents\Nodejs2024
console.log(path.basename(__filename)); // server.js
console.log(path.extname(__filename)); // .js

console.log(path.parse(__filename));
// { root: 'C:\\', dir: 'C:\\Users\\mehdi\\Documents\\Nodejs2024', ext: '.js', name: 'server' }

const math = require("./math");
console.log(math.add(2, 2)); // 4

const { substract } = require("./math");
console.log(substract(2, 2)); // 0
