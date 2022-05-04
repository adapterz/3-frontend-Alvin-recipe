import './header.js';
import './footer.js';
import { postFetch } from './component.js';

const auth_push_btn = document.querySelector('#auth_push_btn');
const auth_btn = document.querySelector('#auth_btn');
const signup_btn = document.querySelector('#signup_btn');

// let email = document.querySelector('#email').value;

auth_push_btn.onclick = async function () {
    let email = document.querySelector('#email').value;
    let authNumber = document.querySelector('#authNumber').value;

    if (!email) return alert('이메일을 입력해 주세요.');

    const data = await postFetch('/users/auth-email', { userEmail: email });
    if (data.info.accepted.length == 1) {
        alert('이메일 발송 완료');
    } else {
        alert('오류가 발생했습니다. 잠시 후에 시도해 주세요.');
    }
};

auth_btn.onclick = async function () {
    let email = document.querySelector('#email').value;
    let authNumber = document.querySelector('#authNumber').value;

    if (!email) return alert('이메일을 입력해 주세요.');

    if (!authNumber) return alert('인증번호를 입력해 주세요.');

    const data = await postFetch('/users/auth', { userEmail: email, userAuthNumber: authNumber });

    if (data.message == 'fail') return alert('인증 실패');

    if (data.results.affectedRows == 1) {
        alert('인증이 완료됐습니다.');
    }
};

signup_btn.onclick = async function () {
    let id = document.querySelector('#id').value;
    let nickname = document.querySelector('#nickname').value;
    let pw = document.querySelector('#pw').value;
    let pw_check = document.querySelector('#pw_check').value;
    let email = document.querySelector('#email').value;
    let authNumber = +document.querySelector('#authNumber').value;

    if (!id) return alert('ID를 입력해 주세요.');
    if (!nickname) return alert('닉네임을 입력해 주세요.');
    if (!pw) return alert('비밀번호를 입력해 주세요.');
    if (!pw_check) return alert('비밀번호를 한번 더 입력해 주세요.');
    if (!email) return alert('이메일을 입력해 주세요.');
    if (!authNumber) return alert('인증번호를 입력해 주세요.');

    if (pw !== pw_check) return alert('비밀번호를 확인해 주세요.');

    const data = await postFetch('/users/signup', {
        userId: id,
        userNickname: nickname,
        userPassword: pw,
        userRetryPassword: pw_check,
        userEmail: email
    });

    if (data.message == 'sameId') return alert('이미 사용중인 아이디 입니다.');
    if (data.message == 'sameNickname') return alert('이미 사용중인 닉네임 입니다.');

    if (data.data.affectedRows == 1) {
        alert('회원가입이 완료됐습니다.');
        return (location.href = '/');
    }
};
