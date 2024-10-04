async function getRecord(token, uid, clientId){
    return (await fetch(`https://www.luogu.com.cn/record/list?user=${uid}&_contentOnly=1`, {
        headers: [
            ["cookie", `_uid=${uid}; __client_id=${clientId}`],
            ["referer", "https://www.luogu.com.cn/"],
            ["x-csrf-token", token],
        ],
        method: "GET",
    }).then(res => res.json())).currentData.records.result;
}

function getRandomEle(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {getRecord, getRandomEle}