const axios = require("axios");
const cheerio = require("cheerio");

/** URL을 통해 해당 페이지 html 가져오기, page = 해당 페이지 */
const getHtml = async (page) => {
  try {
    return await axios.get("https://www.skku.edu/skku/campus/skk_comm/notice01.do?mode=list&&articleLimit=10&article.offset=" + page);
  } catch (error) {
    console.error(error);
  }
};

/** html 파싱하여 데이터 추출하기 , page = 해당 페이지*/
const crawling = async (page) => {
  getHtml(page)
  .then(html => {
    const data_list = [];

    const $ = cheerio.load(html.data);
    const textarray = $("dt.board-list-content-title").children("a"); // 제목
    const viewarray = $(".board-mg-l10"); // 조회수

    for (let i = 0; i < 10; i++) {
      data_list[i] = { title : $(textarray[i]).text().trim(), view : +($(viewarray[i]).text().trim()) };
    } // 객채 배열에 데이터 저장

    data_list.forEach(function(item, index, array) {
        console.log(item.title);
        console.log(item.view);
        console.log("------------------------------------");
    });
    console.log("\n");
  })
};

for (let i = 0; i < 30; i+=10) {
  crawling(i);
}