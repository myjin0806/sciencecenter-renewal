//사이드바
let goToTop = document.getElementById('go_to_top');
goToTop.addEventListener('click',function(event) {
  event.preventDefault();
  window.scroll({
    top:0,
    behavior:'smooth'
  })
})
let miniGoToTop = document.getElementById('mini_go_to_top');
let doc = document.documentElement;
let scrollAmount; 
window.addEventListener('scroll', function(){
  scrollAmount=doc.scrollTop;
  if(scrollAmount>600){
    miniGoToTop.classList.add('visible');
    header.style.backgroundColor = '#ffffffea';
    document.querySelector('.header_menu h1 img.white_logo').style.display = 'none';
    document.querySelector('.header_menu h1 img.black_logo').style.display = 'block';
  }else{
    miniGoToTop.classList.remove('visible');
    header.style.backgroundColor = '';
    document.querySelector('.header_menu h1 img.white_logo').style.display = 'block';
    document.querySelector('.header_menu h1 img.black_logo').style.display = 'none';
  }
});
miniGoToTop.addEventListener('click',function(event){
  event.preventDefault();
  window.scroll({
    top:0,
    behavior:'smooth'
  });
});

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
handleScreenChange(mediaQuery); 
//전시관
var exhibitionSlider = new Swiper(".exhibition_slider", {
  slidesPerView: 1,
  spaceBetween: 15,
  loop: true,
  navigation: {
    nextEl: ".exhibition-swiper-button-next",
    prevEl: ".exhibition-swiper-button-prev",
  },
  breakpoints: {
    420:{
      slidesPerView: 2,
      spaceBetween: 15,
    },
    769:{
      slidesPerView:3,
      spaceBetween: 15,
    }
  }
});

//프로그램
var programSlider = new Swiper(".program_slider", {
  slidesPerView: 1,
  spaceBetween: 87,
  loop: true,
  centeredSlides: true,
  navigation: {
    nextEl: ".program-swiper-button-next",
    prevEl: ".program-swiper-button-prev",
  },
  //반응형
  breakpoints: {
    420:{
      slidesPerView : 3,
      spaceBetween: 87
    },
    769: {
      slidesPerView : 5,
      spaceBetween: 20
    }
  }
});

//알립니다
/* notice section 제어 */
let noticeLink = document.querySelectorAll('.notice_tab a');
let noticeContent = document.querySelectorAll('.notice_tab_cont');
for(let i = 0; i<noticeLink.length; i++){
  noticeLink[i].addEventListener('click', function(e){
    e.preventDefault();

    let orgNotice = e.target.getAttribute('href');
    let tabNotice = orgNotice.replace('#','');
    for (let x = 0; x < noticeContent.length; x++){
      noticeContent[x].style.display='none'
    }
    document.getElementById(tabNotice).style.display = 'block';
    for (let j = 0; j < noticeLink.length; j++){
      noticeLink[j].classList.remove('active');
      e.target.classList.add('active');
    };
  });
};
document.getElementById('notice01').style.display = 'block';
/* 카드 */
let cardLink = document.querySelectorAll('.card_tab a');
let cardContent = document.querySelectorAll('.card_tab_cont');
for(let i = 0; i<cardLink.length; i++){
  cardLink[i].addEventListener('click', function(e){
    e.preventDefault();
    let orgCard = e.target.getAttribute('href');
    let tabCard = orgCard.replace('#','');
    for(let x=0; x < cardContent.length; x++){
      cardContent[x].style.display='none'
    }
    document.getElementById(tabCard).style.display='block';
    for(let j = 0;j < cardLink.length; j++){
      cardLink[j].classList.remove('active');
      e.target.classList.add('active');
    };
  });
};
document.getElementById('card01').style.display ='block';


//소통마당
var SnsSlider = new Swiper(".sns_slider", {
  slidesPerView: 2,
  loop: true,
  navigation: {
    nextEl: ".sns-swiper-button-next",
    prevEl: ".sns-swiper-button-prev",
  },
  //반응형
  breakpoints: {
    769: {
      slidesPerView : 4,
    }
  }
});
var VideoSlider = new Swiper(".video_slider", {
  loop: true,
  spaceBetween: 40,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".video-swiper-pagination",
    clickable: true,
  },
});
/* sns Slider 제어 */
// 각 버튼과 슬라이드들 선택
var SnsSlider = new Swiper(".sns_slider", {
  slidesPerView: 2,
  loop: true,
  navigation: {
    nextEl: ".sns-swiper-button-next",
    prevEl: ".sns-swiper-button-prev",
  },
  //반응형
  breakpoints: {
    769: {
      slidesPerView : 4,
    }
  }
});
var VideoSlider = new Swiper(".video_slider", {
  loop: true,
  spaceBetween: 40,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/* sns Slider 제어 */
// 각 버튼과 슬라이드 선택
const snsButtons = document.querySelectorAll('.sns_btn a');
const slides = document.querySelectorAll('.sns_slider .swiper-slide');

// 버튼 클릭 시 해당 클래스 슬라이드만 보이게 하고, 다시 클릭하면 숨김 해제
snsButtons.forEach(button => {
  button.addEventListener('click', function() {
    const buttonClass = this.classList[0];
    if (this.classList.contains('active')) {
      // 이미 활성화된 경우, 슬라이드를 모두 다시 보이게 함
      slides.forEach(slide => {
        slide.style.display = 'block';
      });
      this.classList.remove('active');
      resetBackgroundPosition();
    } else {
      // 모든 슬라이드 숨기고 해당 클래스 슬라이드만 보이게 함
      slides.forEach(slide => {
        slide.style.display = 'none';
        if (slide.classList.contains(buttonClass.replace('_btn', ''))) {
          slide.style.display = 'block';
        }
      });
      // 버튼의 배경 위치 설정
      setButtonBackgroundPosition(buttonClass);
      // 다른 버튼의 active 상태와 배경 위치 초기화
      snsButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    }
  });
});
// 모든 버튼을 원래 위치로 되돌리는 함수
function resetBackgroundPosition() {
  document.querySelector('.blog_btn').style.backgroundPosition = '0px 0px';
  document.querySelector('.instagram_btn').style.backgroundPosition = '-56px 0px';
  document.querySelector('.facebook_btn').style.backgroundPosition = '-112px 0px';
  document.querySelector('.twitter_btn').style.backgroundPosition = '-168px 0px';
}
// 버튼에 대한 배경 위치 설정
function setButtonBackgroundPosition(buttonClass) {
  resetBackgroundPosition(); // 모든 버튼을 원래 위치로 되돌림
  switch (buttonClass) {
    case 'blog_btn':
      document.querySelector('.blog_btn').style.backgroundPosition = '-28px 0px';
      break;
    case 'instagram_btn':
      document.querySelector('.instagram_btn').style.backgroundPosition = '-84px 0px';
      break;
    case 'facebook_btn':
      document.querySelector('.facebook_btn').style.backgroundPosition = '-140px 0px';
      break;
    case 'twitter_btn':
      document.querySelector('.twitter_btn').style.backgroundPosition = '-196px 0px';
      break;
  }
}


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