const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const { format } = require("date-fns");
const { v4: uuid } = require("uuid"); // v4: uuid: V4 is the function adn uuid is an alias

const logEvents = async message => {
  const dateTime = `${format(new Date(), "dd/MM/yyyy\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);

  try {
    if (!fs.existsSync(path.join(__dirname, "logs")))
      await fsPromises.mkdir("logs");

    await fsPromises.appendFile(
      path.join(__dirname, "logs", "eventLogs.txt"),
      logItem
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = logEvents;
