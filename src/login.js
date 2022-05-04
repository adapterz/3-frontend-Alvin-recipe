import './header.js';
import './footer.js';
import { cookieUserId, cookieUserNickname, setCookie, postFetch } from './component.js';

const loginBtn = document.querySelector('#login_btn');
const pwInput = document.querySelector('#pw');

const login = async function () {
    const id = document.querySelector('#id').value;
    const pw = document.querySelector('#pw').value;

    if (!id) return alert('ID를 입력해 주세요.');

    if (!pw) return alert('비밀번호를 입력해 주세요.');

    const data = await postFetch('/users/login', { userId: id, userPassword: pw });

    if (data.message == 'fail') return alert('아이디 또는 비밀번호를 확인해주세요.');

    if (data.length !== 0) {
        setCookie('nickname', data.userData[0].nickname, 1);
        location.href = '/';
    }
};

loginBtn.addEventListener('click', login);
pwInput.addEventListener('keydown', function (e) {
    if (e.keyCode == 13) {
        login();
    }
});
