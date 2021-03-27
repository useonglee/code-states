const githubID = 'useonglee'; // 여러분의 아이디로 바꿔주세요
const chats = document.querySelector('#chats');

const app = {
  server: `http://3.36.72.17:3000/${githubID}/messages`,
  init: () => {
    app.addEventListener();
    app.fetch((data) => {
      return data.map(el => app.renderMessage(el));
    })
  },

  fetch: (callback) => {
    window.fetch(app.server)
    .then((res) => {return res.json()})
    .then(callback)
    .catch((err) => {console.log(err)});
  },

  send: (data, callback) => {
    window.fetch(app.server, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {return res.json()})
    .then(callback);
  },

  clearMessages: () => {
    chats.innerHTML = '';
  },

  renderMessage: ({ username, text, roomname }) => {
    const template = `<div class="chat">
    <div class="username">${username
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')}</div>
    <div>${text
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')}</div>
    <div>${roomname
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')}</div>
    </div>`
    chats.innerHTML = template + chats.innerHTML;
  },

  addEventListener: () => {
    let submit = document.querySelector('#send .submit');
    if (submit) {
      submit.addEventListener('submit', app.handleButton);
    }
  },

  handleButton: (e) => {
    e.preventDefault();
    app.clearMessages();
    app.send({
      username: document.querySelector(".inputUser").value,
      text: document.querySelector(".inputChat").value,
      roomname: '코드스테이츠',
    },
    () => {
      app.fetchAndRender(),
      app.cleanForm()
    });
  },

  fetchAndRender: () => {
    app.fetch(data => {
      data.map(el => app.renderMessage(el));
    })
  },

  cleanForm: () => {
    document.querySelector(".inputUser").value = "",
    document.querySelector(".inputChat").value = ""
  }
};

app.init();

// 테스트를 위한 코드입니다. 아래 내용은 지우지 마세요
if(window.isNodeENV){
  module.exports = app;
}