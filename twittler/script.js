// your code here
"use strict";

// const state = {
//   isFilteredPage: false
// };

const tweetList = document.querySelector("#tweetList"); // 메인 ul

const userInputText = document.querySelector("#newComment"); // 유저 입력창
const refreshBtn = document.querySelector("#refresh"); // 새로고침 버튼
const tweetBtn = document.querySelector("#tweetButton"); // 트윗버튼

//----------------------------- 구현 시작! -----------------------------------

function printComments() {
  DATA.forEach(printComment);
}

function printComment(tweet) {
  let commentElement = makeCommentElement(tweet);
  tweetList.appendChild(commentElement);
  addfilterList();
}

function makeCommentElement(tweet) {
  const li = document.createElement("li");
  li.classList.add("tweetContent");

  const user = document.createElement("span");
  user.classList.add("userName");
  user.textContent = tweet.user;

  const message = document.createElement("div");
  message.classList.add("userMessage");
  message.textContent = tweet.message;

  const create_at = document.createElement("span");
  create_at.classList.add("create_at");
  create_at.textContent = new Date().format();

  li.append(user, message, create_at);

  return li;
}
printComments();

// ------------------------------remove Element-----------------------------
function removeTweet() {
  const removeList = document.querySelector("#tweetList");

  while (removeList.hasChildNodes()) {
    removeList.removeChild(removeList.firstChild);
  }
}

// ------------------------------랜덤 트윗 버튼------------------------------
refreshBtn.onclick = function () {
  const randomList = generateNewTweet();

  DATA.unshift(randomList);

  alert("랜덤 트윗을 보여드립니다!");

  removeTweet();
  printComments();
};

// ------------------------------트윗 추가!!---------------------------------
tweetBtn.onclick = function () {
  if (userInputText.value === "") {
    alert("트윗을 작성해주세요!");
  } else {
    alert("트윗을 추가합니다!");

    const tweetObj = {};
    tweetObj.user = "나는 우성";
    tweetObj.message = userInputText.value;
    tweetObj.create_at = new Date().format();

    DATA.unshift(tweetObj);

    if (DATA.length > 7) {
      DATA.pop();
    }

    removeTweet();
    printComments();

    userInputText.value = "";
  }
};

// ------------------------------필 터 링--------------------------------------

/*
0. 빈 배열을 만든다.
1. 유저네임과 일치할 때 필터링할 필터함수를 만들어준다.
1-1. 필터함수내에서 제거했다가 printComments()를 한다.
1-2. 다시 재배치할 함수를 만들어 준다 (forEach 사용)
2. querySelectorAll(".userName") 을 이용해 컨텐트를 유사배열로 만든다.
3. 반복문으로 유사배열을 돌아준다.
4. 각 이름에 이벤트를 넣어준다. 
*/

let listArr = [];

function filterList(event) {
  let targetUser = event.target.textContent;
  listArr = DATA.filter(el => el.user === targetUser);

  removeTweet();
  changeList(listArr);
}

function changeList(list) {
  list.forEach(printComment);
}

function addfilterList() {
  let userList = document.querySelectorAll(".userName");

  for (let i = 0; i < userList.length; i++) {
    userList[i].addEventListener("click", filterList);
  }
}

//--------------------------레퍼런스 따라 한 부분-------------------------------
// const tweetListReducer = function (ul, tweet, id) {
//   const li = document.createElement("li");
//   li.classList.add("Contents");

//   const user = document.createElement("span");
//   user.classList.add("userName");
//   user.textContent = tweet.user;
//   user.addEventListener("click", handleClickUser);

//   const message = document.createElement("div");
//   message.classList.add("userMassage");
//   message.textContent = tweet.message;

//   const create_at = document.createElement("div");
//   create_at.classList.add("createAt");
//   create_at.textContent = new Date().format();

//   li.append(user, message, create_at);
//   ul.append(li);
//   return ul;
// };

// const renderDATA = function () {
//   const ul = document.createElement("ul");
//   ul.id = "tweetWrapper";

//   const tweets = DATA.reduce(tweetListReducer, ul);

//   state.isFilteredPage = false;
//   tweetList.append(tweets);
// };

// const renderFilteredDATA = function (targetName) {
//   const ul = document.createElement("ui");
//   ul.id = "tweetWrapper";

//   const tweets = DATA.filter(function (tweet) {
//     return tweet.user === targetName;
//   }).reduce(tweetListReducer, ul);

//   state.isFilteredPage = true;
//   tweetList.append(tweets);
// };

// const removeTweet = function () {
//   const tweetWrapper = document.querySelector("#tweetWrapper");
//   tweetWrapper.remove();
// };

// const handleClickUser = function (event) {
//   const targetName = event.target.textContent;
//   alert(`${targetName} 필터링 결과입니다.`);
//   removeTweet();
//   renderFilteredDATA(targetName);
// };

// tweetBtn.onclick = function () {
//   if (userInputText.value === "") {
//     alert("내용을 입력해주세요!");
//   } else {
//     const tweetObj = {};

//     tweetObj.user = "나는 우성";
//     tweetObj.message = userInputText.value;
//     tweetObj.create_at = new Date().format();
//     alert("트윗을 전송합니다!");

//     DATA.unshift(tweetObj);

//     removeTweet();
//     renderDATA();

//     userInputText.value = "";
//   }
// };

// refreshBtn.addEventListener("click", function () {
//   const tweetObj = generateNewTweet();

//   DATA.unshift(tweetObj);
//   removeTweet();
//   renderDATA();
// });

// renderDATA();
