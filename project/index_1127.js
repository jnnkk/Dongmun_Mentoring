#!/usr/bin/env node

const https = require('https');
const parser = require('node-html-parser');
const url = 'https://www.skku.edu/skku/campus/skk_comm/notice01.do?mode=list&&articleLimit=10&article.offset=';
const header = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'// 실제 브라우저로 접속한 것처럼 보이게 하는 헤더
    }
};

// get 메소드 호출

for (let i = 0 ; i < 30 ; i + 10){
    const v = i.toString();

    https.get(
        url + v, header, (res) => {
        let data = "";
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            const root = parser.parse(data);
            const list = root.querySelectorAll('.board-list-content-title > a');
            list.forEach((item) => {
                console.log(item.innerText.trim(), '\n');
            });
            const list_num = root.querySelectorAll('.board-mg-l10');
            list_num.forEach((item) => {
                console.log(item.innerText.trim(), '\n');
            });
        });
    });
}