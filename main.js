const chalk = require('chalk');
const config = require('./config');
const luogu = require('./luogu_api');
const coyote = require('./coyote_api');

const uid = config.uid;
const clientId = config.client_id;
const request = require("request");
let token = "###";

//获取CSRF Token的截取函数
function getAlarms(val, later, before) {
  var alarm = val;
  var index = alarm.indexOf(later);
  alarm = alarm.substring(index + later.length, alarm.length);
  index = alarm.indexOf(before);
  alarm = alarm.substring(0, index);
  return alarm
}

//获取CSRF Token
function getCSRFToken() {
  var headers = {
    "cookie": `_uid=${uid}; __client_id=${clientId}`
  };
  request({
    url: "https://www.luogu.com.cn",
    method: "GET",
    headers: headers
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      token = getAlarms(body, "<meta name=\"csrf-token\" content=\"", "\">");
    }
    else {
      if (response != undefined) console.log("Error " + response.statusCode);
      else console.log("Error undefined")
    }
  })
}

getCSRFToken();

setInterval(getCSRFToken, config.timeout * 1000);

last_rid = 0;

console.log(chalk.green("Starting..."));

setInterval(async function () {
	records = await luogu.getRecord(token, uid, clientId);
	if (records.length == 0) {
		console.log(chalk.red("No records found."));
		return;
	}
	if (last_rid == 0) {
		last_rid = records[0].id;
		console.log(chalk.green("First record found. ID: " + last_rid));
		return;
	}
	let b = false;
	for (let i = records.length - 1; i >= 0; i--) {
		const record = records[i];
		if (record.id <= last_rid) {
			b = true;
			continue;
		}
		if (record.status <= 1) {
			console.log(chalk.yellow("Record not judged. ID: " + record.id));
			break;
		}
		console.log(chalk.green("New record found. ID: " + record.id));
		if (record.status !== 12) {
			console.log(chalk.red("UNAC recieved."));
			await coyote.addStrength(config.addWhenUNAC);
			await coyote.fire(config.fireWhenUNAC, config.fireTime);
		}
		else {
			console.log(chalk.green("AC recieved."));
			await coyote.reduceStrength(config.reduceWhenAC);
		}
		last_rid = record.id;
	}
	if (!b) {
		console.log(chalk.red("WARN! Some records maybe lost."));
	}
}, config.timeout * 1000);