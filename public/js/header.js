import './footer.js';
import { displayImage, cookieUserId } from './component.js';

let login;

if (cookieUserId == undefined) {
    login = 0;
} else if (cookieUserId !== undefined) {
    login = 1;
}
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
if (login == 0) {
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
    // const postIcon = document.createElement('i');
    // const mypageIcon = document.createElement('i');
    const postIcon = displayImage('../image/plus2.png');
    const mypageIcon = displayImage('../image/profile.png');
    postIcon.classList.add('icon');
    mypageIcon.classList.add('icon');

    navDivTag.prepend(postATag);
    navDivTag.append(mypageATag);

    postATag.prepend(postIcon);
    postATag.href = '/post/registration';
    // postIcon.setAttribute('class', 'fa-solid fa-plus profile_icon');

    mypageATag.prepend(mypageIcon);
    mypageATag.href = '/account/mypage';
    // mypageIcon.setAttribute('class', 'fa-regular fa-user profile_icon');
}
