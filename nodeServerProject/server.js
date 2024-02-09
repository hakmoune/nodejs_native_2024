const http = require("http"); // Pour creer des serveurs qui gere les requetes HTTP
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvent = require("./logEvents");
const EventEmitter = require("events");
class Emitter extends EventEmitter {}
const myEmitter = new Emitter();

myEmitter.on("log", (msg, fileName) => {
  logEvent(msg, fileName);
});

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      !contentType.includes("image") ? "utf8" : ""
    );
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData; // Convert JSON into an object

    response.writeHead(filePath.includes("404.html") ? 404 : 200, {
      "Content-Type": contentType
    });

    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data // Convert JS to JSON
    );
  } catch (err) {
    console.error(err);
    myEmitter.emit("log", `${err.name}: ${err.message}`, "errLog.txt");
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  const extension = path.extname(req.url); // return the extension, e.g: .html
  myEmitter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");

  let contentType;
  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/" // slice used to extract a portion of a string, -1 means the last character
      ? path.join(__dirname, "views", req.url, "index.html") // if the mention only the subdirectory e.g: .../users/
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  // Makes .html extension not required in the browser
  if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

  const fileExiste = fs.existsSync(filePath);
  if (fileExiste) {
    // serve the file
    serveFile(filePath, contentType, res);
  } else {
    switch (path.parse(filePath).base) {
      // 301 redirect
      case "old-page.html":
        res.writeHead(301, { Location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      default:
        // 404
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

// ohtehr methode for handling endPoint and server
/*const server = http.createServer((req, res) => {
  let filePath;
  other methode 1:
    if (req.url === "/" || req.url === "/index.html") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      filePath = path.join(__dirname, "views", "index.html");
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) throw err;
        // Send a response
        res.end(data);
      });
    }
  
  other method 2:
    switch (req.url) {
      case "/":
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        filePath = path.join(__dirname, "views", "index.html");
        fs.readFile(filePath, "utf8", (err, data) => {
          if (err) throw err;
          res.end(data);
        });
        break;
      case "/index.html":
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        filePath = path.join(__dirname, "views", "index.html");
        fs.readFile(filePath, "utf8", (err, data) => {
          if (err) throw err;
          res.end(data);
        });
        break;
      default:
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        filePath = path.join(__dirname, "views", "404.html");
        fs.readFile(filePath, (err, data) => {
          if (err) throw err;
          res.end(data.toString());
        });
    }
});*/

server.listen(PORT, () => {
  console.log(`Server running on the port: ${PORT}`);
});
