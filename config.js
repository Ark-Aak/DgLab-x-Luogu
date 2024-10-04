// 填写uid
const uid = ""

// 填写clientid
const client_id = ""

// 每次请求的间隔时间，单位秒
const timeout = 3

// 本地使用无需修改
const coyote_clientId = "all"

// 填写控制器地址
const controller = "http://127.0.0.1:8920"

// UNAC 增加强度
const addWhenUNAC = 5

// AC 强度降低
const reduceWhenAC = 2

// UNAC 时一键开火 (最高30)
const fireWhenUNAC = 30

// 一键开火时间
const fireTime = 5

function makeUrl(path) {
	return controller + "/api/game/" + coyote_clientId + path;
}

module.exports = {uid, client_id, timeout, coyote_clientId, controller, makeUrl, addWhenUNAC, reduceWhenAC, fireWhenUNAC, fireTime}