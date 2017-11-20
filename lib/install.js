// with command line 'install', we need to append to the the start command a '&& leasot-to-readme run' (series)

// requires and consts
var fs = require('fs');
var rl = require('readline');
const PACKAGE_JSON = 'package.json';
const RUN_COMMAND = ' && leasot-to-readme run"';

// variables
var OUTPUT_FILE = 'README.md';
var COMMAND = '"start":';

// other vars
var iLineCount = 0;
var iFoundLine = 0;
var iCommandContents = '';

// find line that command occurs
var lineReader = rl.createInterface({
  input: fs.createReadStream(PACKAGE_JSON)
});
lineReader.on('line', function (line) {
  if (line.includes(COMMAND)) {
    iFoundLine = iLineCount;

    // JSON is very picky - we need to handle the comma if it in the command to append to
    console.log(line);
    console.log(line.substring(line.length - 1));
    if (line.substring(line.length - 1) === ',') {
      iCommandContents = "\t" + COMMAND + RUN_COMMAND + ','; // command with trailing comma
    } else {
      iCommandContents = "\t" + COMMAND + RUN_COMMAND; // command without trailing comma
    }

    // append the command to the line number where '"start":' command occurs in package.json
    var data = fs.readFileSync(PACKAGE_JSON).toString().split("\n");
    data.splice(iFoundLine, 1); // remove current command line
    data.splice(iFoundLine, 0, iCommandContents); // write new command line
    var packageJSON = data.join("\n"); // join back together with newlines

    // write back to package.json
    fs.writeFile(PACKAGE_JSON, packageJSON, function (err) {
      if (err) return console.log(err);
    });
  } else {
    iLineCount++;
  }
});
