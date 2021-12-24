// onload..
window.addEventListener("load", function() {
  getBankData();
  createElement();
})

const spend = document.querySelector(".spend");
let date  = '';
let totalPrice = 0;

// json 형태의 은행 데이터를 가져옴
function getBankData() {
  const url = "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f6e4d3d3-c52c-4ea8-b665-968a3b17c5ea/bank.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20211224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211224T052946Z&X-Amz-Expires=86400&X-Amz-Signature=860d5077f9f1dd4a4034b0acccfa33b98cc18eba2325c690ffc8aed30e3ee464&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22bank.json%22&x-id=GetObject"
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'json';
  request.send();
  request.onload = () => {
    let bankData = request.response;
    createElement(bankData);
  }
}

// 가져온 json 데이터를 기반으로 Element 생성
function createElement(bankData) {
  if (bankData !== undefined) { // 가져온 데이터가 undefiend가 아니라면
    let list = bankData.bankList.reverse(); // 가장 최근 데이터부터 보여주기 위해 reverse로 재배치
    // 생성할 태그들 선언
    let daySpend = null;
    let spendTitle = null;
    let h4 = null;
    let small = null;
    let ul = null;
    let li = null;
    let history = null;
    let price = null;

    // bankList로 for문 시작
    list.forEach(bank => {
      if(bank.date !== date) { //날짜가 다르면 day-spend 부터 생성해야함
        if (price !== null) {
          small.innerText = addCommma(totalPrice);
          totalPrice = 0;
        }
        date = bank.date; // 날짜 최신화
        daySpend = document.createElement("div");
        spendTitle = document.createElement("div");
        h4 = document.createElement("h4");
        small = document.createElement("small");
        ul = document.createElement("ul");

        daySpend.className = "day-spend";
        spendTitle.className = "spend-title";
        
        li = document.createElement("li");
        history = document.createElement("span");
        price = document.createElement("span");
        
        history.className = "history";
        price.className = "price";

        history.innerText = bank.history;

        price.innerText = addCommma(bank.price);

        li.appendChild(history);
        li.appendChild(price);

        ul.appendChild(li);

        h4.innerText = date;
        small.innerText = '금액';

        spendTitle.appendChild(h4);
        spendTitle.appendChild(small);

        daySpend.appendChild(spendTitle);
        daySpend.appendChild(ul);

        spend.appendChild(daySpend);

        totalPrice += bank.price;
      } else { // 날짜가 같다면 li만 쌓아주자
        li = document.createElement("li");
        history = document.createElement("span");
        price = document.createElement("span");
        
        history.className = "history";
        price.className = "price";
        
        history.innerText = bank.history;
        price.innerText = addCommma(bank.price);

        li.appendChild(history);
        li.appendChild(price);

        ul.appendChild(li);

        totalPrice += bank.price;
      }
    });
  }
}

// price 천 단위 마다 콤마 추가(,)
function addCommma(price){
  let len, count, result; 

  price = price + ""; 
  count = price.length % 3 ;
  len = price.length; 

  result = price.substring(0, count); 
  while (count < len) { 
      if (result != "") result += ","; 
      result += price.substring(count, count + 3); 
      count += 3; 
  } 
  return result;
}

// 슬라이드 영역 요소 검색!
const scrollEl = document.querySelector('.scroll');
// 슬라이드 영역를 토글하는 버튼 검색!
const sec2El = document.querySelector('.sec2');
// 슬라이드 영역 숨김 여부 기본값!
let upScrean = false
// 토글 버튼을 클릭하면,
scrollEl.addEventListener('click', function () {
// 슬라이드 영역 숨김 여부를 반댓값으로 할당!  
  upScrean = !upScrean

  if (upScrean) {
    sec2El.classList.add('up')
  } else {
    sec2El.classList.remove('up')
  }
});

// 은행 데이터 채워넣기

// 저금통 팝업
const open = () => {
  document.querySelector(".modal").classList.remove("hidden");
}

const close = () => {
  document.querySelector(".modal").classList.add("hidden");
}

document.querySelector(".make").addEventListener("click", open);
document.querySelector(".closeBtn").addEventListener("click", close);
document.querySelector(".bg").addEventListener("click", close);

