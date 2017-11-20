// with command line 'install', we need to append to the the start command a '&& leasot-to-readme run' (series)

// requires and consts
var fs = require('fs');
var rl = require('readline');
const PACKAGE_JSON = 'package.json';
const RUN_COMMAND = ' && leasot-to-readme run';

// variables
var COMMAND = '"start":';

// other vars
var iLineCount = 0;

var sCommandContents = '';

// find line that command occurs
var lineReader = rl.createInterface({
  input: fs.createReadStream(PACKAGE_JSON)
});
lineReader.on('line', function (line) {
  if (line.includes(COMMAND)) {

    // JSON is very picky - we need to handle the comma if it in the command to append to
    if (line.substring(line.length - 1) === ',') {
      sCommandContents = line.substring(0, line.length - 2) + RUN_COMMAND + '",'; // command with trailing comma
    } else {
      sCommandContents = line.substring(0, line.length - 1) + RUN_COMMAND + '"'; // command without trailing comma
    }

    // append the command to the line number where '"start":' command occurs in package.json
    var data = fs.readFileSync(PACKAGE_JSON).toString().split("\n");
    data.splice(iLineCount, 1); // remove current command line
    data.splice(iLineCount, 0, sCommandContents); // write new command line
    var packageJSON = data.join("\n"); // join back together with newlines

    // write back to package.json
    fs.writeFile(PACKAGE_JSON, packageJSON, function (err) {
      if (err) return console.log(err);
    });
  } else {
    iLineCount++;
  }
});
