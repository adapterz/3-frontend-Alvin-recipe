import './header.js';
import './footer.js';

const auth_push_btn = document.querySelector('#auth_push_btn');
const auth_btn = document.querySelector('#auth_btn');
const signup_btn = document.querySelector('#signup_btn');

// let email = document.querySelector('#email').value;

auth_push_btn.onclick = function () {
    let email = document.querySelector('#email').value;
    let authNumber = document.querySelector('#authNumber').value;

    if (!email) return alert('이메일을 입력해 주세요.');

    fetch('http://localhost:3000/users/auth/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userEmail: email
        })
    }).then(data => {
        if (data.status == 201) {
            alert('이메일 발송 완료');
        }
    });
};

auth_btn.onclick = function () {
    let email = document.querySelector('#email').value;
    let authNumber = document.querySelector('#authNumber').value;

    if (!authNumber) return alert('인증번호를 입력해 주세요.');

    fetch('http://localhost:3000/users/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userEmail: email,
            userAuthNumber: authNumber
        })
    }).then(data => {
        if (data.status == 200) {
            alert('이메일 인증 완료');
        }
    });
};

signup_btn.onclick = function () {
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

    fetch('http://localhost:3000/users/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: id,
            userNickname: nickname,
            userPassword: pw,
            userRetryPassword: pw_check,
            userEmail: email
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.status == 201) {
                alert('회원가입 완료');
                window.open('/');
            } else {
                console.log(data);
            }
        });
};
// login_btn.onclick = function () {
//     let id = document.querySelector('#id').value;
//     let pw = document.querySelector('#pw').value;

//     if (!id) return alert('ID를 입력해 주세요.');
//     if (!pw) return alert('패스워드를 입력해 주세요.');
//     fetch('http://localhost:3000/users/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             userId: id,
//             userPassword: pw
//         })
//     })
//         // .then(response => response.json())
//         .then(data => {
//             if (data.status == 200) {
//                 alert('로그인 성공!!');
//                 console.log(data);
//             } else {
//                 alert('ID 또는 비밀번호를 확인해주세요');
//             }
//         })
//         .catch(err => {
//             console.log('err', err);
//         });
// };
