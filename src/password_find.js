import './header.js';
import './footer.js';
import { postFetch } from './component.js';
import { loginCheck } from './header.js';

const login = loginCheck();

if (login === false) {
    alert('로그인 후 이용하실 수 있습니다.');
    location.href = '/';
}

const email_send_btn = document.querySelector('#email_send_btn');

email_send_btn.onclick = async function () {
    let email = document.querySelector('#email').value;
    let id = document.querySelector('#id').value;

    if (!id) return alert('아이디를 입력해 주세요.');

    if (!email) return alert('이메일을 입력해 주세요.');

    const data = await postFetch('/users/find-password', { userEmail: email, userId: id });

    console.log(data);

    if (data.message == 'fail') return alert('일치하는 회원 정보가 없습니다.');

    if (data.message == 'done') return alert('이메일 발송 완료!');
};
