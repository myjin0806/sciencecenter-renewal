//헤더&서브메뉴
let header = document.querySelector('header');
let navItems = document.querySelectorAll('.nav_item');
let submenus = document.querySelectorAll('.submenu');
let overlay = document.querySelector('.overlay');
let submenuHeights = {};
let searchBtn = document.querySelector('.search_btn');
let searchWrap = document.querySelector('.search-wrap');

let mediaQuery = window.matchMedia('screen and (min-width: 769px)');

function handleScreenChange(e){
  if(e.matches){
    header.addEventListener('mouseenter', function(){
      header.classList.add('active');
    });
    header.addEventListener('mouseleave', function(){
      header.classList.remove('active');
    })
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
          overlay.classList.add('active');
        }
      });
    });
    //서브메뉴에 마우스를 올렸을 때 유지되도록 함
    submenus.forEach(function(sub){
      sub.addEventListener('mouseenter', function(){
        sub.style.maxHeight = submenuHeights[sub.id] + 'px';
        overlay.classList.add('active');
        header.classList.add('active');
      })
      sub.addEventListener('mouseleave', function(){
        sub.style.maxHeight = '0';
        overlay.classList.remove('active');
        header.classList.remove('active');
      });
    })
    //nav에서 나가면 서브메뉴 닫기
    document.querySelector('header nav').addEventListener('mouseleave',function(){
      submenus.forEach(function(sub){
        sub.style.maxHeight = '0';
        overlay.classList.remove('active');
      });
    })
    searchWrap.addEventListener('mouseenter', function(){
      header.classList.add('active');
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

    if (matchMedia("screen and (max-width: 768px)").matches) {
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
          siteMap.classList.remove('active')
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
}

mediaQuery.addEventListener('change', handleScreenChange);


//cont_navi

let naviItems = document.querySelectorAll('.cont_navi_list > ul > li');
naviItems.forEach(function(item) {
  item.querySelector('a').addEventListener('click', function(event) {
    event.preventDefault();
    let depthMenu = item.querySelector('.depth');
    if (depthMenu) {
      if (depthMenu.style.height === '' || depthMenu.style.height === '0px') {
        naviItems.forEach(function(i) {
          let subMenu = i.querySelector('.depth');
          if (subMenu) {
            subMenu.style.height = '0';
          }
        });
        depthMenu.style.height = depthMenu.scrollHeight + 'px';
      } else {
        depthMenu.style.height = '0';
      }
    }
  });
});

handleScreenChange(mediaQuery); 
//비상대피로 모달창
let exitBtn = document.getElementById('exit'),
    modalExit = document.querySelector('.modal_exit'),
    closeModalBtn = document.querySelector('.close_modal');

console.log(exitBtn, modalExit,closeModalBtn)
exitBtn.addEventListener('click', ()=>{
  modalExit.classList.add('active');
  document.body.style.overflow = 'hidden';
})
closeModalBtn.addEventListener('click', ()=>{
  modalExit.classList.remove('active');
  document.body.style.overflow = 'auto';
})

//가이드 리스트  -  맵 div 연결
let listItems = document.querySelectorAll('.guide_list li'),
    mapItems = document.querySelectorAll('.guide_map div');

listItems.forEach((item ,index) =>{
  item.addEventListener('mouseenter', ()=>{
    mapItems.forEach(mapItem =>{
      mapItem.classList.remove('active');
    });
    if (mapItems[index]){
      mapItems[index].classList.add('active');
    }
  });
  //커서가 나갈시 active 제거
  item.addEventListener('mouseleave', ()=>{
    mapItems[index].classList.remove('active');
  })
})

//푸터
let familySite = document.getElementById('sel_family');
let openSite = document.getElementById('open_site');

familySite.addEventListener('change', function(){
  let selectedvalue = familySite.value;
  openSite.href = selectedvalue;
});
openSite.addEventListener('click', function(e){
  if (openSite.href === '#'||openSite.href === '' ){
    e.preventDefault();
  }else{
    openSite.setAttribute('target','_blank');
  }
});