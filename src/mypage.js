import './header.js';
import './footer.js';
import { cookieUserId, displayImage, postFetch, patchFetch, setCookie } from './component.js';
import { loginCheck } from './header.js';

let url;
if (document.location.hostname === 'localhost') {
    // 개발모드의 url
    url = 'http://localhost:3000';
} else {
    // 배포모드의 url
    url = 'https://api.reci-p.com';
}

const login = loginCheck();

if (login === false) {
    alert('로그인 후 이용하실 수 있습니다.');
    location.href = '/';
}

const postData = await postFetch('/users/inquiry', { userNickname: cookieUserId });

// console.log(postData);
const id = document.querySelector('#id');
const nickname = document.querySelector('#nickname');
const email = document.querySelector('#email');
const image = document.querySelector('#profileimage');

const check = document.querySelector('#check');
const changePasswordBtn = document.querySelector('#change_pw');
const confirmPassword = document.querySelector('#confirm');
const confirmInput = document.querySelector('#confirm_input');
const logoutBtn = document.querySelector('#logout');
const imageUploadBtn = document.querySelector('#input-file');
const withdrawalBtn = document.querySelector('#withdrawal');

id.textContent = postData.results[0].user_id;
nickname.value = postData.results[0].nickname;
email.textContent = postData.results[0].email;
image.src = `${url}${postData.results[0].image}`;

//닉네임 중복체크 눌렀을 때 이벤트
check.addEventListener('click', async function () {
    const nickname = document.querySelector('#nickname').value;
    const nicknameCheck = await postFetch('/users/inquiry', { userNickname: nickname });

    // 데이터베이스 조회 후 반환되는 데이터가 있으면 사용중인 닉네임
    if (nicknameCheck.results.length > 0) return alert('이미 사용중인 닉네임 입니다.');

    // 데이터베이스 조회 후 반환되는 데이터가 없으면 사용 할 수 있는 닉네임
    if (nicknameCheck.results.length == 0) {
        alert('사용 가능한 닉네임 입니다.');
        // 변경할 건지 확인 받음
        if (confirm('변경 하시겠습니까?') == true) {
            const pw = document.querySelector('#pw').value;
            const nickname = document.querySelector('#nickname').value;

            if (!pw) return alert('패스워드를 입력해 주세요.');

            if (pw !== postData.results[0].password) return alert('패스워드가 다릅니다.');

            const data = await patchFetch('/users/edit-nickname', {
                userId: postData.results[0].user_id,
                editNickname: nickname,
                userPassword: pw
            });

            if (data.updateData.affectedRows == 0) {
                return alert('잠시후에 다시 시도해 주세요.');
            } else {
                //변경한 닉네임으로 쿠키 변경
                setCookie('nickname', nickname, 1);
                alert('닉네임 변경 완료');
            }
        } else {
            return alert('취소되었습니다.');
        }
    }
});

// 비밀번호 변경 클릭했을 때 이벤트
changePasswordBtn.addEventListener('click', function () {
    // 비밀번호 확인 창 보이게 해줌
    confirmPassword.style.display = 'flex';
    confirmInput.style.display = 'block';
    //눌렀던 비밀번호 변경 input은 안보이게 변경
    changePasswordBtn.style.display = 'none';

    const changeBtn = document.querySelector('#change_pw_btn');

    changeBtn.addEventListener('click', async function () {
        // 비밀번호 유효성 변수
        const checkSpace = /\s/g;
        const checkUpper = /[A-Z]+/g;
        const checkLower = /[a-z]+/g;
        const checkNum = /[0-9]+/g;
        const checkSpecial = /[^a-z0-9ㄱ-ㅎ가-힣]+/gi;
        const checkHangul = /[ㄱ-ㅎ가-힣]+/g;

        const pw = document.querySelector('#pw').value;
        const confirmPw = document.querySelector('#confirm_input').value;

        // 비밀번호칸 입력안하면 종료
        if (!pw) return alert('비밀번호를 입력해 주세요.');
        // 재입력 비밀번호칸 입력안하면 종료
        if (!confirmPw) return alert('비밀번호 확인을 입력해 주세요.');
        // 패스워드 길이 검사(9~20 글자)
        if (pw.length < 9 || pw.length > 20) return alert('9~20글자 사이로 입력해 주세요.');
        // 패스워드에 공백 사용 불가
        if (pw.match(checkSpace) !== null) return alert('공백을 사용할 수 없습니다.');
        // 패스워드에 대문자 포함여부 확인
        if (pw.match(checkUpper) == null) return alert('대문자를 1개이상 포함해 주세요.');
        // 패스워드에 소문자 포함여부 확인
        if (pw.match(checkLower) == null) return alert('소문자를 1개이상 포함해 주세요.');
        // 패스워드에 숫자 포함여부 확인
        if (pw.match(checkNum) == null) return alert('숫자를 1개이상 포함해 주세요.');
        // 패스워드에 특수문자 포함여부 확인
        if (pw.match(checkSpecial) == null) return alert('특수문자를 1개이상 포함해 주세요.');
        // 패스워드에 한글 사용불가
        if (pw.match(checkHangul) !== null) return alert('한글은 사용할 수 없습니다.');
        // 비밀번호와 비밀번호 확인이 다르면 종료
        if (pw !== confirmPw) return alert('비밀번호가 다릅니다.');

        const data = await patchFetch('/users/edit-password', {
            indexId: postData.results[0].id,
            userPassword: pw,
            userRetryPassword: confirmPw
        });

        if (data.updateData.affectedRows == 0) {
            return alert('잠시후에 다시 시도해 주세요.');
        } else {
            alert('비밀번호 변경 완료');
        }
    });
});

//로그아웃 이벤트 리스너
logoutBtn.addEventListener('click', function () {
    // 쿠키 만료기간을 어제로 돌려서 만료시킴
    setCookie('nickname', nickname, -1);
    // 메인화면으로 돌아감
    location.href = '/';
});

// 프로필이미지 변경하기 누르면 발생 이벤트
imageUploadBtn.addEventListener('change', async function () {
    const data = await uploadFile(imageUploadBtn.files[0]);
    if (data.imageData.affectedRows == 0) {
        return alert('잠시후에 다시 시도해 주세요.');
    } else {
        location.reload();
        return alert('프로필이미지 변경 완료');
    }
});
// 프로필이미지 변경하기 누르면 발생 펑션
const uploadFile = async function (file) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('userNickname', cookieUserId);

    const getData = await fetch(`${url}/users/image-upload`, {
        method: 'PATCH',
        body: formData
    });
    const data = await getData.json();
    return data;
};

// 회원탈퇴 이벤트 리스너
withdrawal.addEventListener('click', async function () {
    const pw = document.querySelector('#pw').value;

    // 비밀번호 입력안하면 종료
    if (!pw) return alert('패스워드를 입력해 주세요.');
    // 입력 비밀번호와 저장된 비밀번호가 다르면 종료
    if (pw !== postData.results[0].password) return alert('패스워드가 다릅니다.');

    const data = await patchFetch('/users/withdrawal', {
        userId: postData.results[0].user_id,
        userPassword: pw
    });

    if (data.results.affectedRows == 0) {
        return alert('잠시후에 다시 시도해 주세요.');
    } else {
        alert('탈퇴가 완료되었습니다.');
        // 쿠키 만료기간을 어제로 돌려서 만료시킴
        setCookie('nickname', nickname, -1);
        // 메인화면으로 돌아감
        location.href = '/';
    }
});
