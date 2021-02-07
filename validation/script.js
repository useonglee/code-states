// [엘리먼트 변수]
// 여기에 querySelector를 이용해 상호작용을 해야 하는 모든 엘리먼트를 전역변수로 지정하세요
const btnSignup = document.querySelector("#btn-signup");

const id = document.querySelector("#input-id");
const pw = document.querySelector("#input-password");
const pwRe = document.querySelector("#input-confirm-pw");

const inputId = document.querySelector("#input-id input");
const inputPw = document.querySelector("#input-password input");
const inputPwre = document.querySelector("#input-confirm-pw input");

// [이벤트 핸들러]
function handleInputId() {
  let valid = moreThanLength(inputId.value, 6);
  if (valid) {
    isValid("#input-id");
  } else {
    displayErrorMessage("#input-id", "아이디가 올바르지 않습니다.");
  }
}

function handleInputPw() {
  let valid = onlyNumberAndEnglish(inputPw.value);
  if (valid) {
    isValid("#input-password");
  } else {
    displayErrorMessage("#input-password", "영어 또는 숫자만 입력해주세요.");
  }
}

function handleInputPwRe() {
  let valid = isTrue(inputPw.value, inputPwre.value);
  if (valid) {
    isValid("#input-confirm-pw");
  } else {
    displayErrorMessage("#input-confirm-pw", "비밀번호가 다릅니다.");
  }
}

function handleBtnSignupClick() {
  let vId = moreThanLength(inputId.value, 6);
  let vPw = onlyNumberAndEnglish(inputPw.value);
  let vPwRe = isTrue(inputPw.value, inputPwre.value);

  if (vId && vPw && vPwRe) {
    isSuccess();
    alert("회원가입을 축하합니다!");
    inputId.value = "";
    inputPw.value = "";
    inputPwre.value = "";
  } else {
    isFail("회원정보가 올바르지 않습니다. 다시 확인해주세요!");
  }

  /*

  버튼을 클릭했을 때, 작동해야하는 시나리오의 예시를 소개합니다.
  예를 들어, 아이디가 8자 이상인지 확인하려면,

  1. 아이디 input box를 변수로 지정한다
  2. input box에 적힌 값을 얻어온다
  3. input 값을 함수를 이용해 검증한다
  4. 함수 리턴값 (true 또는 false)을 통해 유효성을 검증하여 로직을 분기한다
  5. 유효하다면, 정상적으로 로그인했다고 alert 창을 띄운다
  6. 유효하지 않다면
    6-1. 아이디 입력창 옆에 오류 메시지를 표시한다
    6-2. 아이디 입력창에 붉은색의 스타일을 적용한다

  */
}

// [유효성 검증 함수]
// 필요에 따라서 여러분들이 사용할 유효성 검증 함수를 추가하세요.

function moreThanLength(str, n) {
  return str.length >= n; // 항상 true 또는 false로 리턴하게 만드는 게 좋습니다.
}

// [유효성 검증 함수]: 영어 또는 숫자만 가능
function onlyNumberAndEnglish(str) {
  return /^[A-Za-z][A-Za-z0-9]*$/.test(str);
}

function isTrue(pw, pwRe) {
  return pw === pwRe;
}

// [유효성 검증 함수]: 최소 8자 이상하면서, 알파벳과 숫자 및 특수문자(@$!%*#?&) 는 하나 이상 포함
function strongPassword(str) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(str);
}

// [시각적 피드백]
// 에러메세지
function displayErrorMessage(selector, text) {
  let check = document.querySelector(selector);
  check.classList.remove("valid");
  check.classList.add("invalid");

  let icon = check.querySelector(".fa");
  icon.classList.add("fa-exclamation-circle"); //  틀림 표시
  icon.classList.remove("fa-thumbs-up"); // 체크 표시

  let msg = check.querySelector(".message");
  msg.textContent = text;
}

function isValid(selector) {
  let check = document.querySelector(selector);
  check.classList.remove("invalid");
  check.classList.add("valid");

  let icon = check.querySelector(".fa");
  icon.classList.remove("fa-exclamation-circle");
  icon.classList.add("fa-thumbs-up");

  let msg = check.querySelector(".message");
  msg.textContent = "";
}

function isSuccess() {
  let success = document.querySelector("#invalid-message");
  success.classList.remove("show");
}

function isFail(text) {
  let fail = document.querySelector("#invalid-message");
  fail.classList.add("show");
  fail.textContent = text;
}

// [엘리먼트와 이벤트 핸들러의 연결]
btnSignup.onclick = handleBtnSignupClick;

id.onkeyup = handleInputId;
pw.onkeyup = handleInputPw;
pwRe.onkeyup = handleInputPwRe;
