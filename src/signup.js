import './header.js';
import './footer.js';
import { postFetch, displayImage } from './component.js';

let url;
if (document.location.hostname === 'localhost') {
    // 개발모드의 url
    url = 'http://localhost:3000';
} else {
    // 배포모드의 url
    url = 'https://api.reci-p.com';
}

const auth_push_btn = document.querySelector('#auth_push_btn');
const auth_btn = document.querySelector('#auth_btn');
const signup_btn = document.querySelector('#signup_btn');
const id = document.querySelector('#id');
const nickname = document.querySelector('#nickname');
const pw = document.querySelector('#pw');
const pwCheck = document.querySelector('#pw_check');
const email = document.querySelector('#email');
const auth = document.querySelector('#authNumber');

const idDiv = document.querySelector('#id_input');
const nicknameDiv = document.querySelector('#nickname_input');
const pwDiv = document.querySelector('#pw_input');
const pwCheckDiv = document.querySelector('#pw_check_input');
const emailDiv = document.querySelector('#email_input');
const authDiv = document.querySelector('#auth_input');

const idSuccessImage = displayImage('/image/check-button.png');
const idFailImage = displayImage('/image/x.png');
const nicknameSuccessImage = displayImage('/image/check-button.png');
const nicknameFailImage = displayImage('/image/x.png');
const pwSuccessImage = displayImage('/image/check-button.png');
const pwFailImage = displayImage('/image/x.png');
const pwCheckSuccessImage = displayImage('/image/check-button.png');
const pwCheckFailImage = displayImage('/image/x.png');
const emailSuccessImage = displayImage('/image/check-button.png');
const emailFailImage = displayImage('/image/x.png');
const authSuccessImage = displayImage('/image/check-button.png');
const authFailImage = displayImage('/image/x.png');

const body = document.querySelector('body');
const loadingBox = document.createElement('div');

const loading = function () {
    const dim = document.createElement('div');
    const loadingIcon = document.createElement('img');

    loadingBox.classList.add('loading_box');
    dim.classList.add('dim');
    loadingIcon.classList.add('loading_icon');
    loadingIcon.src = '/image/loading.png';

    loadingBox.prepend(dim);
    loadingBox.append(loadingIcon);

    body.append(loadingBox);
};

// 아이디 입력 시 유효성 검사
id.addEventListener('keyup', function () {
    const id = document.querySelector('#id').value;

    // 특수문자 체크 정규식
    const checkSpecial = /[^a-z0-9ㄱ-ㅎ가-힣]+/gi;

    try {
        if (id.length < 4 || id.length > 12) {
            // 아이디는 4~12글자
            idDiv.appendChild(idFailImage);
            idFailImage.title = '4~12글자를 사용해 주세요.';
            idDiv.removeChild(idSuccessImage);
        } else if (id.match(checkSpecial) !== null) {
            // 아이디에 특수문자 사용금지
            idDiv.appendChild(idFailImage);
            idFailImage.title = '특수문자는 사용할 수 없습니다.';
            idDiv.removeChild(idSuccessImage);
        } else {
            idDiv.appendChild(idSuccessImage);
            idDiv.removeChild(idFailImage);
        }
    } catch {
        return;
    }
});

// 닉네임 입력시 유효성 검사
nickname.addEventListener('keyup', function () {
    const nickname = document.querySelector('#nickname').value;

    try {
        if (nickname.length < 2 || nickname.length > 8) {
            nicknameDiv.appendChild(nicknameFailImage);
            nicknameFailImage.title = '2~8글자를 사용해 주세요.';
            nicknameDiv.removeChild(nicknameSuccessImage);
        } else {
            nicknameDiv.removeChild(nicknameFailImage);
            nicknameDiv.appendChild(nicknameSuccessImage);
        }
    } catch {
        return;
    }
});

// 비밀번호 입력시 유효성 검사
pw.addEventListener('keyup', function () {
    const pw = document.querySelector('#pw').value;

    const checkSpace = /\s/g;
    const checkUpper = /[A-Z]+/g;
    const checkLower = /[a-z]+/g;
    const checkNum = /[0-9]+/g;
    const checkSpecial = /[^a-z0-9ㄱ-ㅎ가-힣]+/gi;
    const checkHangul = /[ㄱ-ㅎ가-힣]+/g;

    try {
        if (pw.length < 9 || pw.length > 20) {
            pwDiv.appendChild(pwFailImage);
            pwFailImage.title = '9~20글자 사이로 입력해 주세요.';
            pwDiv.removeChild(pwSuccessImage);
        } else if (pw.match(checkSpace) !== null) {
            pwDiv.appendChild(pwFailImage);
            pwFailImage.title = '비밀번호에 공백은 포함 될 수 없습니다.';
            pwDiv.removeChild(pwSuccessImage);
        } else if (pw.match(checkUpper) == null) {
            pwDiv.appendChild(pwFailImage);
            pwFailImage.title = '비밀번호에 대문자를 포함 시켜주세요.';
            pwDiv.removeChild(pwSuccessImage);
        } else if (pw.match(checkLower) == null) {
            pwDiv.appendChild(pwFailImage);
            pwFailImage.title = '비밀번호에 소문자를 포함 시켜주세요.';
            pwDiv.removeChild(pwSuccessImage);
        } else if (pw.match(checkNum) == null) {
            pwDiv.appendChild(pwFailImage);
            pwFailImage.title = '비밀번호에 숫자를 포함 시켜주세요.';
            pwDiv.removeChild(pwSuccessImage);
        } else if (pw.match(checkSpecial) == null) {
            pwDiv.appendChild(pwFailImage);
            pwFailImage.title = '비밀번호에 특수문자를 포함 시켜주세요.';
            pwDiv.removeChild(pwSuccessImage);
        } else if (pw.match(checkHangul) !== null) {
            pwDiv.appendChild(pwFailImage);
            pwFailImage.title = '비밀번호에 한글은 포함 될 수 없습니다..';
            pwDiv.removeChild(pwSuccessImage);
        } else {
            pwDiv.removeChild(pwFailImage);
            pwDiv.appendChild(pwSuccessImage);
        }
    } catch {
        return;
    }
});

// 비밀번호 확인 유효성 검사
pwCheck.addEventListener('keyup', function () {
    const pw = document.querySelector('#pw').value;
    const pwCheck = document.querySelector('#pw_check').value;

    try {
        if (pw !== pwCheck) {
            pwCheckDiv.appendChild(pwCheckFailImage);
            pwCheckFailImage.title = '비밀번호가 일치하지 않습니다.';
            pwCheckDiv.removeChild(pwCheckSuccessImage);
        } else {
            pwCheckDiv.removeChild(pwCheckFailImage);
            pwCheckDiv.appendChild(pwCheckSuccessImage);
        }
    } catch {
        return;
    }
});

// 이메일 유효성 검사
email.addEventListener('keyup', function () {
    const email = document.querySelector('#email').value;
    const checkEmail = /[\w\-\.]+\@[\w\-\.]+\.[\w]/g;
    try {
        if (email.match(checkEmail) == null) {
            emailDiv.appendChild(emailFailImage);
            emailFailImage.title = '이메일 형식이 다릅니다.';
            emailDiv.removeChild(emailSuccessImage);
        } else {
            emailDiv.removeChild(emailFailImage);
            emailDiv.appendChild(emailSuccessImage);
        }
    } catch {
        return;
    }
});

const imageUploadBtn = document.querySelector('#input-file');
let profileImage = document.createElement('img');
authDiv.after(profileImage);
profileImage.classList.add('profile_icon');
profileImage.src = `${url}/image/default.png`;

let image = profileImage.src;

// 프로필 이미지 변경하기
imageUploadBtn.addEventListener('change', async function () {
    const data = await uploadFile(imageUploadBtn.files[0]);
    if (data.message == 'success') {
        profileImage.src = `${url}${data.image}`;
        image = data.image;
        return;
    } else {
        return alert('오류가 발생했습니다.');
    }
});

// 프로필이미지 변경하기 누르면 발생 펑션
const uploadFile = async function (file) {
    const formData = new FormData();
    formData.append('image', file);

    const getData = await fetch(`${url}/users/signup-image`, {
        method: 'POST',
        body: formData
    });
    const data = await getData.json();
    return data;
};

// 인증번호 발송 버튼 이벤트
auth_push_btn.onclick = async function () {
    const load = setTimeout(loading, 0);

    let email = document.querySelector('#email').value;
    const checkEmail = /[\w\-\.]+\@[\w\-\.]+\.[\w]/g;
    if (!email) return alert('이메일을 입력해 주세요.');
    if (email.match(checkEmail) == null) return alert('이메일 형식을 확인해 주세요.');
    const data = await postFetch('/users/auth-email', { userEmail: email });
    if (data.message == 'success') {
        document.querySelector('#email').readOnly = true;
        loadingBox.remove();
        clearTimeout(load);
        return alert('이메일 발송 완료');
    } else {
        return alert('오류가 발생했습니다. 잠시 후에 시도해 주세요.');
    }
};

// 인증번호 인증버튼 이벤트
auth_btn.onclick = async function () {
    let email = document.querySelector('#email').value;
    let authNumber = document.querySelector('#authNumber').value;
    const checkEmail = /[\w\-\.]+\@[\w\-\.]+\.[\w]/g;

    if (!email) return alert('이메일을 입력해 주세요.');
    if (email.match(checkEmail) == null) return alert('이메일 형식을 확인해 주세요.');

    if (!authNumber) return alert('인증번호를 입력해 주세요.');
    if (authNumber.length !== 6) return alert('인증번호의 자리수가 다릅니다.');

    const data = await postFetch('/users/auth', { userEmail: email, userAuthNumber: authNumber });

    if (data.message == 'email_check') return alert('이메일 주소를 확인해 주세요.');

    if (data.message == 'fail') return alert('인증 번호가 틀렸습니다.');

    if (data.message == 'success') {
        const authBox = document.querySelector('#auth_box');
        const authBtn = document.querySelector('#auth_btn');
        const p = document.createElement('p');
        p.textContent = '인증 완료';

        authBtn.style.display = 'none';
        authBox.append(p);

        return alert('인증이 완료됐습니다.');
    }
};

// 회원가입 버튼 이벤트
signup_btn.onclick = async function () {
    const checkSpace = /\s/g;
    const checkUpper = /[A-Z]+/g;
    const checkLower = /[a-z]+/g;
    const checkNum = /[0-9]+/g;
    const checkSpecial = /[^a-z0-9ㄱ-ㅎ가-힣]+/gi;
    const checkHangul = /[ㄱ-ㅎ가-힣]+/g;
    const checkEmail = /[\w\-\.]+\@[\w\-\.]+\.[\w]/g;

    let id = document.querySelector('#id').value;
    let nickname = document.querySelector('#nickname').value;
    let pw = document.querySelector('#pw').value;
    let pw_check = document.querySelector('#pw_check').value;
    let email = document.querySelector('#email').value;
    let authNumber = document.querySelector('#authNumber').value;

    if (!id) return alert('ID를 입력해 주세요.');
    if (!nickname) return alert('닉네임을 입력해 주세요.');
    if (!pw) return alert('비밀번호를 입력해 주세요.');
    if (!pw_check) return alert('비밀번호를 한번 더 입력해 주세요.');
    if (!email) return alert('이메일을 입력해 주세요.');
    if (!authNumber) return alert('인증번호를 입력해 주세요.');

    if (pw.length < 9 || pw.length > 20) return alert('비밀번호는 9~20글자 사이로 수정해 주세요.');
    if (pw.match(checkSpace) !== null) return alert('비밀번호에 공백은 사용하실 수 없습니다.');
    if (pw.match(checkUpper) == null) return alert('비밀번호에 대문자를 포함 시켜주세요.');
    if (pw.match(checkLower) == null) return alert('비밀번호에 소문자를 포함 시켜주세요.');
    if (pw.match(checkNum) == null) return alert('비밀번호에 숫자를 포함 시켜주세요.');
    if (pw.match(checkSpecial) == null) return alert('비밀번호에 특수문자를 포함 시켜주세요.');
    if (pw.match(checkHangul) !== null) return alert('비밀번호에 한글은 사용할 수 없습니다.');
    if (email.match(checkEmail) == null) return alert('이메일 형식을 확인해 주세요.');

    if (pw !== pw_check) return alert('비밀번호를 확인해 주세요.');

    const data = await postFetch('/users/signup', {
        userId: id,
        userNickname: nickname,
        userPassword: pw,
        userRetryPassword: pw_check,
        userEmail: email,
        image: image
    });

    if (data.message == 'email_auth') return alert('이메일 인증을 완료해 주세요.');
    if (data.message == 'email_check') return alert('이메일 인증을 완료해 주세요.');
    if (data.message == 'sameId') return alert('이미 사용중인 아이디 입니다.');
    if (data.message == 'sameNickname') return alert('이미 사용중인 닉네임 입니다.');
    if (data.message == 'sameEmail') return alert('이미 사용중인 이메일 입니다.');

    if (data.message == 'success') {
        alert('회원가입이 완료됐습니다.');
        return (location.href = '/');
    }
};
