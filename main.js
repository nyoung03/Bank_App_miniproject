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