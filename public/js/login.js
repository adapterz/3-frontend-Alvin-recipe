import './header.js';
import './footer.js';
import { cookieUserId } from './component.js';

const loginBtn = document.querySelector('#login_btn');
const pwInput = document.querySelector('#pw');

const login = async function () {
    const id = document.querySelector('#id').value;
    const pw = document.querySelector('#pw').value;

    let cookie = 'userId=' + id + '; path=/;';

    if (!id) return alert('ID를 입력해 주세요.');

    if (!pw) return alert('비밀번호를 입력해 주세요.');
    await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: id,
            userPassword: pw
        })
    })
        .then(data => {
            if (data.status == 200) {
                document.cookie = cookie;
                location.href = '/';
            } else {
                alert('ID 또는 비밀번호를 확인해주세요');
            }
        })
        .catch(err => {
            console.log('err', err);
        });
};

loginBtn.addEventListener('click', login);
pwInput.addEventListener('keydown', function (e) {
    if (e.keyCode == 13) {
        login();
    }
});

// loginBtn.onclick = function () {
//     let id = document.querySelector('#id').value;
//     let pw = document.querySelector('#pw').value;

//     if (!id) return alert('ID를 입력해 주세요.');
//     if (!pw) return alert('비밀번호를 입력해 주세요.');
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
//         .then(data => {
//             if (data.status == 200) {
//                 alert('로그인 성공!!');
//                 location.href = '/';
//             } else {
//                 alert('ID 또는 비밀번호를 확인해주세요');
//             }
//         })
//         .catch(err => {
//             console.log('err', err);
//         });
// };
