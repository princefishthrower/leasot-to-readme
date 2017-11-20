// with command line 'install', we need to append to the the start command a '&& leasot-to-readme run' (series)

// requires and consts
var fs = require('fs');
const PACKAGE_JSON = 'package.json';
const RUN_COMMAND = ' && leasot-to-readme run';

// variables
var OUTPUT_FILE = 'README.md';
var COMMAND = '"start":';

// other vars
var iLineCount = 0;
var iFoundLine = 0;
var iCommandContents = '';

var lineReader = require('readline').createInterface({
  input: fs.createReadStream(PACKAGE_JSON)
});

lineReader.on('line', function (line) {
  if (line.includes(COMMAND)) {
    iFoundLine = iLineCount;
    iCommandContents = line;
  } else {
    iLineCount++;
  }
});

if (iFoundLine === 0) {
  console.log("Command " + COMMAND + " not found in package.json!")
  return;
}

// JSON is very picky - we need to handle the comma if it in the command to append to
if (iCommandContents.substring(iCommandContents - 1) === ',') {
  iCommandContents = iCommandContents.substring(iCommandContents - 1) + RUN_COMMAND + ','; // with trailing comma
} else {
  iCommandContents = iCommandContents + RUN_COMMAND; // without trailing comma
}

// append the command to the line number where '"start":' command occurs in package.json
var data = fs.readFileSync(PACKAGE_JSON).toString().split("\n");
data.splice(iFoundLine, 0, iCommandContents);
var packageJSON = data.join("\n");

// write back to package.json
fs.writeFile(PACKAGE_JSON, packageJSON, function (err) {
  if (err) return console.log(err);
});
