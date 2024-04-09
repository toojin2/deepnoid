"use strict";
/*!
 * fullPage 2.9.7
 * https://github.com/alvarotrigo/fullPage.js
 * @license MIT licensed
 *
 * Copyright (C) 2015 alvarotrigo.com - A project by Alvaro Trigo
 */
// fullpage
$(function () {
  let fp_auto_scroll = true;
  // 창의 높이가 800px 이하인 경우에만 fp_auto_scroll 변수를 false로 설정합니다.
  if (window.innerHeight <= 800) {
    fp_auto_scroll = false;
  }

  $("#fullpage").fullpage({
    //options here
    autoScrolling: fp_auto_scroll, // fp_auto_scroll 변수에 따라 자동 스크롤 설정
    scrollHorizontally: true,
    sectionsColor: ["#fff"],
    scrollingSpeed: 1000,
    anchors: [
      "firstPage",
      "secondPage",
      "thirdPage",
      "fourthPage",
      "fifthPage",
    ],
    menu: "#myMenu",
    afterLoad: function (anchorLink, index) {
      console.log("현재 섹션구간 " + index);
    },
    afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
      console.log("현재슬라이드구간" + slideIndex);
    },
    afterLoad: function (destination) {
      // 헤더 배경색, padding
      setTimeout(function () {
        if (destination == "firstPage") {
          $("#header").css({ background: "transparent" });
          $(".header").css({ padding: "0 4rem" });
          $("#myMenu").removeClass("active"); // navigation 첫번째 페이지 숨김
          $("aside").removeClass("show"); //arrow up 첫번째 숨김
        } else {
          $("#header").css({ background: "rgba(0, 0, 0, 0.1)" });
          $(".header").css({ padding: "0 8rem" });
          $("#myMenu").addClass("active"); // navigation 두번째 페이지부터 보임
          $("aside").addClass("show"); //arrow up 두번째 페이지부터 보임
        }
      }, 200);
    },
  });
});
//swiper1
const bullet = ["01", "02"];
const mySwiper = new Swiper(".swiper1", {
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 3000,
  },
  speed: 500,
  pagination: {
    el: ".main-pagination",
    clickable: "true",
    renderBullet: function (index, className) {
      return (
        '<div class="' +
        className +
        '"><span>' +
        bullet[index] +
        "</span></div>"
      );
    },
  },
});
// swiper2
const bu_Swiper = new Swiper(".swiper2", {
  loop: true,
  spaceBetween: 40,
  slidesPerView: 2.5,
  speed: 500,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
// swiper3
const news_Swiper = new Swiper(".swiper3", {
  direction: "horizontal",
  loop: true,
  spaceBetween: 40,
  slidesPerView: 4,
  speed: 500,
  observer: true, // 추가
  observeParents: true, // 추가
  navigation: {
    nextEl: ".news_nexbtn",
    prevEl: ".news_prebtn",
  },

  // 스크롤바 설정하기
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
});
// swiper4
const location_slide = document.querySelectorAll(".sns_slide_tit");
let location_slide_name = new Array(0);

location_slide.forEach(function (target, index) {
  location_slide_name.push(target.innerHTML);
});
const sns_Swiper = new Swiper(".swiper4", {
  loop: false,
  spaceBetween: 40,
  slidesPerView: 1.5,
  speed: 500,
  navigation: {
    nextEl: ".sns_nextbtn",
    prevEl: ".sns_prebtn",
  },
  centeredSlides: true,
  pagination: {
    el: ".sns-pagination-div",
    clickable: true,
    renderBullet: function (i, name) {
      console.log(i, name);
      return `<span class="${name}">${location_slide_name[i]}</span>`;
    },
  },
});

// nav
let header = document.querySelector("#header");
const lnbSub = document.querySelector(".lnb_sub");
const nav = document.querySelector("nav");

nav.addEventListener("mouseenter", function () {
  header.classList.add("active");
});
nav.addEventListener("mouseleave", function () {
  header.classList.remove("active");
});

// pre,next 클릭시 cur-num 숫자 감소 증가
const resultElement = document.querySelector(".cur-num");
const newsElement = document.querySelector(".news_cur-num");
let number = parseInt(resultElement.innerText);
let index = parseInt(newsElement.innerText);
const preBtn = document.querySelector(".slide_prebtn");
const nextBtn = document.querySelector(".slide_nexbtn");
const news_preBtn = document.querySelector(".news_prebtn");
const news_nextBtn = document.querySelector(".news_nexbtn");

function initializeElements() {
  preBtn.addEventListener("click", handlePreBtnClick);
  nextBtn.addEventListener("click", handleNextBtnClick);
  news_preBtn.addEventListener("click", handleNewsPreBtnClick);
  news_nextBtn.addEventListener("click", handleNewsNextBtnClick);
}

function handlePreBtnClick() {
  number = number === 1 ? 6 : number - 1;
  updateResult();
}

function handleNextBtnClick() {
  number = number === 6 ? 1 : number + 1;
  updateResult();
}

function handleNewsPreBtnClick() {
  index = index === 1 ? 8 : index - 1;
  updateNewsResult();
}

function handleNewsNextBtnClick() {
  index = index === 8 ? 1 : index + 1;
  updateNewsResult();
}

function updateResult() {
  resultElement.innerText = number.toString().padStart(2, "0");
}

function updateNewsResult() {
  newsElement.innerText = index.toString().padStart(2, "0");
}

// 초기화 함수 호출, 중복방지
initializeElements();

//info select클릭시 tell email 목록
function displayInfo() {
  let departmentSelect = document.getElementById("departmentSelect");
  let contactInfoDiv = document.getElementById("contactInfo");
  let phoneNumberParagraph = document.getElementById("phoneNumber");
  let emailParagraph = document.getElementById("email");

  let selectedDepartment = departmentSelect.value;

  if (selectedDepartment === "일반문의") {
    phoneNumberParagraph.innerText = " +82-2-6952-6001";
    emailParagraph.innerText = " deepnoid@deepnoid.com";
  } else if (selectedDepartment === "의료AI") {
    phoneNumberParagraph.innerText = " 070-4681-2245";
    emailParagraph.innerText = " medical@deepnoid.com";
  } else if (selectedDepartment === "산업AI") {
    phoneNumberParagraph.innerText = " 070-4681-3314";
    emailParagraph.innerText = " industrial@deepnoid.com";
  } else if (selectedDepartment === "플랫폼") {
    phoneNumberParagraph.innerText = " 070-4681-2247";
    emailParagraph.innerText = " deepphi@deepnoid.com";
  } else if (selectedDepartment === "딥에듀") {
    phoneNumberParagraph.innerText = " 070-4681-0622";
    emailParagraph.innerText = " edu@deepnoid.com";
  } else if (selectedDepartment === "주식_IR") {
    phoneNumberParagraph.innerText = " 070-4681-3356";
    emailParagraph.innerText = " ir@deepnoid.com";
  } else if (selectedDepartment === "제휴마케팅") {
    phoneNumberParagraph.innerText = " 070-4681-3357";
    emailParagraph.innerText = " mktg@deepnoid.com";
  } else if (selectedDepartment === "인사총무") {
    phoneNumberParagraph.innerText = " 070-5214-1754";
    emailParagraph.innerText = " hr@deepnoid.com";
  } else if (selectedDepartment === "경영본부") {
    phoneNumberParagraph.innerText = " 070-4681-2246";
    emailParagraph.innerText = "finance@deepnoid.com";
  } else {
    phoneNumberParagraph.innerText = "+82-2-6952-6001";
    emailParagraph.innerText = "deepnoid@deepnoid.com";
  }

  // 선택한 분야에 따라 정보 표시
  contactInfoDiv.style.display = "block";
}

// inquiry modal
const inquiryLink = document.querySelector(".inquiry");
const modal = document.querySelector(".modal");

inquiryLink.addEventListener("click", function () {
  modal.style.display = "block";
});
// modal 외부를 클릭하면 닫기
modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
// 모달 닫기 버튼을 클릭 닫기
const modalCloseBtn = document.querySelector(".modal-close-btn");
modalCloseBtn.addEventListener("click", function () {
  modal.style.display = "none";
});
