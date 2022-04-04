import './header.js';
import './footer.js';

const login_btn = document.querySelector('#login_btn');
login_btn.onclick = function () {
    let id = document.querySelector('#id').value;
    let pw = document.querySelector('#pw').value;

    if (!id) return alert('ID를 입력해 주세요.');
    if (!pw) return alert('비밀번호를 입력해 주세요.');
    fetch('http://localhost:3000/users/login', {
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
                alert('로그인 성공!!');
                console.log(data);
            } else {
                alert('ID 또는 비밀번호를 확인해주세요');
            }
        })
        .catch(err => {
            console.log('err', err);
        });
};
