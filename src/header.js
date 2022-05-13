import './footer.js';
import { displayImage, cookieUserNickname, postFetch } from './component.js';

const loginCheck = function () {
    let login;
    if (cookieUserNickname == undefined) {
        login = 0;
        return false;
    } else if (cookieUserNickname !== undefined) {
        login = 1;
        return true;
    }
};
const data = loginCheck();

const headClass = document.querySelector('.header');
const logoDivTag = document.createElement('div');
const logoATag = document.createElement('a');
const navDivTag = document.createElement('div');

logoDivTag.classList.add('header_logo');
headClass.prepend(logoDivTag);
logoDivTag.prepend(logoATag);
logoATag.textContent = 'For recipe';
logoATag.classList.add('nav_logo');
logoATag.href = '/';

logoDivTag.append(navDivTag);

navDivTag.classList.add('header_nav');

//로그인 여부에 따른 헤더 부분
if (data === false) {
    // if (login == 0) {
    const loginATag = document.createElement('a');
    const signupATag = document.createElement('a');
    navDivTag.prepend(loginATag);
    navDivTag.append(signupATag);
    loginATag.classList.add('header_nav_link');
    loginATag.textContent = '로그인';
    loginATag.href = '/account/login';

    signupATag.classList.add('header_nav_link');
    signupATag.textContent = '회원가입';
    signupATag.href = '/account/signup';
} else {
    const postATag = document.createElement('a');
    const mypageATag = document.createElement('a');

    const postIcon = displayImage('../image/plus2.png');
    const mypageIcon = document.createElement('img');
    postIcon.classList.add('icon');
    mypageIcon.classList.add('icon');

    navDivTag.prepend(postATag);
    navDivTag.append(mypageATag);

    postATag.prepend(postIcon);
    postATag.href = '/post/registration';

    mypageATag.prepend(mypageIcon);
    mypageATag.href = '/account/mypage';
    // const userData = await postFetch('http://localhost:3000/users/inquiry', { userNickname: cookieUserNickname });
    const userData = await postFetch('/users/inquiry', { userNickname: cookieUserNickname });

    //로그인한 사용자의 프로필 이미지로 변경
    mypageIcon.src = `//localhost:3000${userData.results[0].image}`;
}

export { loginCheck };
