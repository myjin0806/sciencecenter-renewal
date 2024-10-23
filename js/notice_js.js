/* 헤더, 서브메뉴 */
//헤더
let header = document.querySelector('header');
let linkOn = document.querySelectorAll('.link_on ul li');
let navItems = document.querySelectorAll('.nav_item');
let linkOnLinks = document.querySelectorAll('.link_on ul li a');
let navLinks = document.querySelectorAll('nav ul li a');
let submenus = document.querySelectorAll('.submenu');
let overlay = document.querySelector('.overlay');
let submenuHeights = {};
let offsetWidth =  window.innerWidth;
let searchBtn = document.querySelector('.search_btn');
let searchWrap = document.querySelector('.search-wrap');

if(offsetWidth > 768){
  /* 메인메뉴 - 서브메뉴 연결 */
  submenus.forEach(function(sub){
    sub.style.display = 'block'; //일시적으로 block설정. 높이가져오기
    let height = sub.scrollHeight; //실제 높이 가져오기
    submenuHeights[sub.id] = height; //객체에 저장
    sub.style.display = ''; //원래 상태로 되돌리기
  })
  //네비게이션 항목에 마우스를 올렸을 때 서브메뉴 펼치기
  navItems.forEach(function(item){
    item.addEventListener('mouseenter', function(){
      //모든 서브메뉴 닫기
      submenus.forEach(function(sub){
        sub.style.maxHeight = 0;
      })
      //현재 마우스를 올린 네비게이션 항목에 해당하는 서브메뉴 열기
      let target = document.getElementById(item.dataset.target);
      if(target){
        target.style.maxHeight = submenuHeights[target.id] + 'px';
        //overlay.classList.add('active');
      }
    });
  });
  //서브메뉴에 마우스를 올렸을 때 유지되도록 함
  submenus.forEach(function(sub){
    sub.addEventListener('mouseenter', function(){
      sub.style.maxHeight = submenuHeights[sub.id] + 'px';
      //overlay.classList.add('active');
    })
    sub.addEventListener('mouseleave', function(){
      sub.style.maxHeight = '0';  
    })
  })
  submenus.forEach(function(sub){
    sub.addEventListener('mouseleave', function(){
      sub.style.maxHeight = '0';
      //overlay.classList.remove('active');
    });
  })
  //nav에서 나가면 서브메뉴 닫기
  document.querySelector('header nav').addEventListener('mouseleave',function(){
    submenus.forEach(function(sub){
      sub.style.maxHeight = '0';
      //overlay.classList.remove('active');
    });
  })
  //검색 창
  searchBtn.addEventListener('click', function(){
    if(searchBtn.classList.contains('active')){
      searchBtn.classList.remove('active');
      searchWrap.classList.remove('active');
    }else{
      searchBtn.classList.add('active');
      searchWrap.classList.add('active');
    }
  })  

}else{
  //모바일&태블릿
  let siteMap = document.querySelector('.site_map');
  let moMenuWrap = document.querySelector('.mobile_menu_wrap');
  let scrollPosition = document.documentElement.scrollTop;

  if (offsetWidth <= 768) {
    siteMap.addEventListener('click', function() {
      // 메뉴가 열려있는지 여부를 확인하고 토글
      if (moMenuWrap.classList.contains('active')) {
        siteMap.classList.remove('active');
        moMenuWrap.classList.remove('active');
        overlay.classList.remove('active');
      } else {
        siteMap.classList.add('active');
        moMenuWrap.classList.add('active');
        overlay.classList.add('active');
        searchBtn.classList.remove('active');
        searchWrap.classList.remove('active');
      }
    });
    /* 모바일 메뉴 */
    //아코디언 2개
    //가장 하위 아이템 선택하면 모바일메뉴 닫기
    let moMenuItems = document.querySelectorAll('.mo-list>li>a'); // 가장 위 메뉴
    let moSubMenuItems = document.querySelectorAll('.mo-list li ul li a'); // 하위 메뉴
    // 최상위 메뉴를 클릭했을 때 하위 메뉴를 열고 닫기
    moMenuItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        // 클릭한 메뉴의 부모인 li를 찾고, 그 하위 ul을 찾음
        const parentLi = this.closest('li');
        const subMenu = parentLi.querySelector('ul');
        if (subMenu) {
          // 현재 메뉴가 열려 있는지 확인
          if (subMenu.style.maxHeight === '' || subMenu.style.maxHeight === '0px') {
            closeAllMenus(moMenuItems);  
            subMenu.style.maxHeight = subMenu.scrollHeight + 'px';
          }else{
            subMenu.style.maxHeight = '0';  
          }
        }
      });
    });
    // 하위 메뉴의 또 다른 하위 메뉴 클릭 시 열고 닫기
    moSubMenuItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const parentLi = this.closest('li');
        const subSubMenu = parentLi.querySelector('ul');
        if (subSubMenu) {
          //현재 서브서브메뉴가 열려있는지 확인
          if (subSubMenu.style.maxHeight === '' || subSubMenu.style.maxHeight === '0px') {
            closeAllMenus(moSubMenuItems); 
            subSubMenu.style.maxHeight = subSubMenu.scrollHeight + 'px'; 
            //상위 서브메뉴의 maxheight 조정
            let upperSubMenu = parentLi.closest('ul');  // 상위 서브메뉴 선택
            if(upperSubMenu) {
              upperSubMenu.style.maxHeight = upperSubMenu.scrollHeight + subSubMenu.scrollHeight + 'px'; // 서브서브메뉴가 열리면서 상위 서브메뉴의 높이도 함께 늘리기
            }
        }else{
          subSubMenu.style.maxHeight = '0';  // 닫기
        }
      }
      });
    });
    // 모든 서브메뉴 닫기 함수
    function closeAllMenus(menuItems) {
      menuItems.forEach(item => {
        const subMenu = item.closest('li').querySelector('ul');
        if (subMenu) {
          subMenu.style.maxHeight = '0';
        }
      });
    }
    let moSubSubMenuItems = document.querySelectorAll('.mo-sub-list li a');
    moSubSubMenuItems.forEach(function(item){
      item.addEventListener('click', function(){
        moMenuWrap.classList.remove('active');
        overlay.classList.remove('active');
      })
    })
    //검색 창
    searchBtn.addEventListener('click', function(){
      if(searchBtn.classList.contains('active')){
        searchBtn.classList.remove('active');
        searchWrap.classList.remove('active');
        overlay.classList.remove('active');
      }else{
        searchBtn.classList.add('active');
        searchWrap.classList.add('active');
        overlay.classList.add('active');
        //서브메뉴 창꺼짐
        siteMap.classList.remove('active');
        moMenuWrap.classList.remove('active');
        overlay.classList.add('active');
      }
    })
    // 오버레이를 클릭했을 때 메뉴 닫기
    overlay.addEventListener('click', function() {
      moMenuWrap.classList.remove('active');
      overlay.classList.remove('active');
      siteMap.classList.remove('active');
      searchBtn.classList.remove('active');
      searchWrap.classList.remove('active');
    });
  }  
}

// 모든 리스트 아이템(li)을 선택
let naviItems = document.querySelectorAll('.cont_navi_list > ul > li');
// 각 리스트 아이템에 클릭 이벤트 추가
naviItems.forEach(function(item) {
  // 리스트 아이템 클릭 시
  item.querySelector('a').addEventListener('click', function(event) {
    event.preventDefault(); // 기본 링크 동작 방지
    // 해당 리스트 아이템의 depth(서브메뉴) 선택
    let depthMenu = item.querySelector('.depth');
    if (depthMenu) {
      // 서브메뉴의 높이가 없거나 0일 때
      if (depthMenu.style.height === '' || depthMenu.style.height === '0px') {
        // 모든 서브메뉴를 닫음
        naviItems.forEach(function(i) {
          let subMenu = i.querySelector('.depth');
          if (subMenu) {
            subMenu.style.height = '0';
          }
        });
        // 현재 클릭한 아이템의 서브메뉴만 펼침
        depthMenu.style.height = depthMenu.scrollHeight + 'px';
      } else {
        // 이미 펼쳐져 있는 경우 다시 접기
        depthMenu.style.height = '0';
      }
    }
  });
});

/* 공지사항 테이블 */
//한 페이지에서 보여줄 개수
// tr, 몇개인지 알아보기
let rowsPerPage = 15;
//변수 지정
let rows = document.querySelectorAll('#notice_table tbody tr');
let rowsCount = rows.length;
let pageCount = Math.ceil(rowsCount/rowsPerPage);
let numbers = document.querySelector('#numbers');

//페이지네이션 3개씩 보이게 하는 변수 추가
let prevPageBtn = document.querySelector('.pagination .xi-play.prev');
let nextPageBtn = document.querySelector('.pagination .xi-play.next');
let stepBackwardBtn = document.querySelector('.pagination .xi-step-backward');
let stepForwardBtn = document.querySelector('.pagination .xi-step-forward');

let pageActiveIdx = 0; //현재 보고있는 페이지 그룹
let currentPageNum = 0; //현재 보고있는 페이지네이션 번호
let maxPageNum = 10; //페이지 그룹 최대 개수

//페이지번호 생성
/* 
  let c = 대상.innerHTML
  대상.innerHTML = <li><a href="">1</a></li>
  for(초기값;조건;증값){}
*/
for(let i = 1; i <= pageCount; i++){
  //numbers.innerHTML ='<li><a href="">'+i+'</a></li>'
  // numbers.innerHTML = `<li><a href="">${i}</a></li>`
  numbers.innerHTML +=  `<li><a href="">${i}</a></li>`;
}
let numberBtn  = numbers.querySelectorAll('a');


//페이지네이션 버튼 클릭시 이벤트 추가
numberBtn.forEach((item, idx)=>{
  item.addEventListener('click', function(e){
    e.preventDefault();
    //테이블 출력함수 
    displayRow(idx);
  });
});
function displayRow(idx){
  let start = idx * rowsPerPage;
  let end = start + rowsPerPage;
  /* 
  idx 0
  100개의 목록
  10개씩 보여주기
  0 ~ 9 
  slice(0, 10)
  splivce 오려내기
  nodelist, htmlcollection > array
  배열로 바꿔주는 방법
  Array,from(대상)
  [...대상]
  */
  let rowsArray = Array.from(rows);

  for(let ra of rowsArray){
    ra.style.display='none';
  }
  let newRows = rowsArray.slice(start, end);
  for (let nr of newRows){
    nr.style.display = '';
  }
  for(let nb of numberBtn){
    nb.classList.remove('active');
  }
  numberBtn[idx].classList.add('active');
}
//초기페이지 먼저 보이게
displayRow(0);

//페이지네이션 그룹 표시함수
function displayPage(num){
  //페이지네이션 감추기
  for(let nb of numberBtn){
    nb.style.display='none'
  }
  //전체 페이지 개수
  let totalPageCount = Math.ceil(pageCount / maxPageNum);
  let pageArr = Array.from(numberBtn);
  let start = num * maxPageNum;
  let end = start + maxPageNum;
  let pageListArr = pageArr.slice(start, end);
  //console.log(num, start, end, pageArr,pageListArr);
  //pageListarr을 배열에 모든 요소 item 반복
  for(let item of pageListArr){
    item.style.display = 'block'
  }
  //첫번째 페이지 일경우 화살표 안보이게
  if(pageActiveIdx === 0){
    prevPageBtn.style.display = 'none'
  }else{
    prevPageBtn.style.display ='block'
  }
  //마지막 페이지 경우 다음페이지 버튼 숨기기

  if(pageActiveIdx == totalPageCount - 1){
    nextPageBtn.style.display = 'none';
  }else{
    nextPageBtn.style.display = 'block'
  }
}
//초기 페이지네이션 그룹 로드
displayPage(0);

//다음 페이지 버튼 클릭 이벤트
nextPageBtn.addEventListener('click', function(){
  //다음 페이지의 시작 인덱스 계산
  //(현재 페이지 시작 인덱스 + 1 페이지 크기)
  let nextPageNum = pageActiveIdx * maxPageNum + maxPageNum;
  //해당 인덱스부터 시작하는 데이터 화면 표시
  displayRow(nextPageNum);
  //인덱스 1씩 증가
  ++pageActiveIdx;
  //활성화된 페이지 인덱스 기준으로 페이지 버튼 업데이트
  displayPage(pageActiveIdx);
});

//이전 페이지 버튼 클릭 이벤트
prevPageBtn.addEventListener('click', function(){
  let nextPageNum = pageActiveIdx * maxPageNum - maxPageNum;
  displayRow(nextPageNum);
  --pageActiveIdx;
  displayPage(pageActiveIdx);
});

//첫 페이지로 이동
stepBackwardBtn.addEventListener('click', function () {
  pageActiveIdx = 0;
  currentPageNum = 0;
  displayRow(0);
  displayPage(0);
});

//마지막 페이지로 이동
stepForwardBtn.addEventListener('click', function () {
  pageActiveIdx = Math.ceil(pageCount / maxPageNum) - 1;
  currentPageNum = pageCount - 1;
  displayRow(currentPageNum);
  displayPage(pageActiveIdx);
});