const axios = require("axios");
const cheerio = require("cheerio");

const all_pages = []; // 전체 페이지 배열

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
  try {
    const html = await getHtml(page);
    const $ = cheerio.load(html.data);
    const textarray = $("dt.board-list-content-title").children("a"); // 제목
    const viewarray = $(".board-mg-l10"); // 조회수

    for (let i = 0; i < 10; i++) {
      all_pages.push({ title : $(textarray[i]).text().trim(), views : +($(viewarray[i]).text().trim()) }); // 전체 페이지 배열에 데이터 저장
    }
  } catch (error) {
    console.error('Crawling failed:', error);
    throw error; // 에러를 잡아서 로깅 후 다시 throw
  }
};

let what_page = 10; // 크롤링할 페이지 수

/** 몇 페이지까지  크롤링? p = 페이지*/
function loop(p) {
  let promises = [];
  for (let i = 0; i < p * 10; i += 10) {
    // crawling 함수가 Promise를 반환한다고 가정
    promises.push(crawling(i));
  }
  return Promise.all(promises);
}


// 크롤링 시작
loop(what_page).then(() => {
  console.log("크롤링 완료");
  console.log(all_pages.length); // 전체 페이지 배열 길이
})
.then(() => {
  view_result = all_pages.sort(function(a, b) {
    return b.views - a.views;
  })
  console.log("정렬 완료");

  // 정렬된 데이터 확인용
  for (let index in view_result) {
    console.log(view_result[index].title);
    console.log(view_result[index].views);
    console.log("------------------------------------");
  }
});