// myVariable = "Hakmoune El Mahdi";
// console.log(global.myVariable);

// const os = require("os");
// console.log(os.type()); // Windows_NT
// console.log(os.version()); // Windows 7 Professional Service Pack 1
// console.log(os.homedir()); // C:\Users\mehdi

// console.log(__dirname); //  C: \Users\mehdi\Documents\Nodejs2024
// console.log(__filename); // C:\Users\mehdi\Documents\Nodejs2024\server.js

// const path = require("path");
// console.log(path.dirname(__filename)); //  C: \Users\mehdi\Documents\Nodejs2024
// console.log(path.basename(__filename)); // server.js
// console.log(path.extname(__filename)); // .js

// console.log(path.parse(__filename));
// // { root: 'C:\\', dir: 'C:\\Users\\mehdi\\Documents\\Nodejs2024', ext: '.js', name: 'server' }

// const math = require("./math");
// console.log(math.add(2, 2)); // 4

// const { substract } = require("./math");
// console.log(substract(2, 2)); // 0

// console.log(process.cwd());

// const fs = require("fs");
// const path = require("path");

// if (!fs.existsSync("src")) {
//   fs.mkdir("src", err => {
//     if (err) throw err;
//     console.log("src folder created successfully");
//   });
// }

// if (!fs.existsSync("./src/exemple.txt")) {
//   const data = "Hello World !!!";
//   fs.writeFile(path.join(__dirname, "src", "exemple.txt"), data, err => {
//     if (err) throw err;
//     console.log("File has been written.");
//   });
// }

// fs.readFile("./src/exemple.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
//   // console.log(data.toString()); // use the fun toString and delete "utf8" param
// });

// const dataAppend = "My name is Mahdi !";
// fs.appendFile(path.join(__dirname, "src", "exemple.txt"), dataAppend, err => {
//   if (err) throw err;
//   console.log("Txt appended");
// });

// const fs = require("fs");
// const path = require("path");

// if (!fs.existsSync("src")) {
//   fs.mkdir("src", err => {
//     if (err) throw err;
//     console.log("src folder created successfully");
//   });
// }

// const dirnamePath = path.join(__dirname, "src", "exemple.txt");
// const data = "Hello World !!!";
// const dataToAppend = "\nMy name is Mahdi";
// const newDirnamePath = path.join(__dirname, "src", "simple.txt");

// fs.writeFile(dirnamePath, data, err => {
//   if (err) throw err;
//   console.log("write file done !");

//   if (fs.existsSync(dirnamePath)) {
//     fs.appendFile(dirnamePath, dataToAppend, err => {
//       if (err) throw err;
//       console.log("Append File done !");

//       fs.rename(dirnamePath, newDirnamePath, err => {
//         if (err) throw err;
//         console.log("renamed file done!");

//         fs.readFile(newDirnamePath, "utf8", (err, data) => {
//           if (err) throw err;
//           console.log(data);
//         });
//       });
//     });
//   }
// });

// Exit on uncaught errors
// process.on("uncaughtException", err => {
//   console.error(`There was an uncaught error: ${err}`);
//   process.exit(1);
// });

const fsPromises = require("fs").promises;
const path = require("path");

const dirnamePath = path.join(__dirname, "src", "exemple.txt");
const newDirnamePath = path.join(__dirname, "src", "simple.txt");
const data = "Hello World !!!";
const dataToAppend = "\nMy name is EL MHADI HAKMOUNE !!!";

const fileOps = async () => {
  try {
    await fsPromises.mkdir("src");
    console.log("mkdir folder created done");

    await fsPromises.writeFile(dirnamePath, data);
    console.log("writeFile file created done");

    await fsPromises.appendFile(dirnamePath, dataToAppend);
    console.log("appendFile text added done");

    await fsPromises.rename(dirnamePath, newDirnamePath);
    console.log("rename file updated done");

    const content = await fsPromises.readFile(newDirnamePath);
    console.log(content.toString());

    await fsPromises.unlink(newDirnamePath);
    console.log("unlink file deleted done");

    await fsPromises.rm("./src", { recursive: true }); // The recursive: true option is provided to recursively delete the folder and its contents. Without this option, the folder must be empty for deletion to succeed.
    console.log("unlink folder deleted done");
  } catch (err) {
    console.error(err);
  }
};

fileOps();
