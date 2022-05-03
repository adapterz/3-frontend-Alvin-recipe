import './header.js';
import './footer.js';

const email_send_btn = document.querySelector('#email_send_btn');

email_send_btn.onclick = function () {
    let email = document.querySelector('#email').value;

    if (!email) return alert('이메일을 입력해 주세요.');

    fetch('http://localhost:3000/users/find-id', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userEmail: email
        })
    }).then(function (data) {
        console.log(data);
        if (data.status == 200) {
            alert('이메일 발송 완료');
        } else {
            alert('일치하는 회원 정보가 없습니다.');
        }
    });
};
