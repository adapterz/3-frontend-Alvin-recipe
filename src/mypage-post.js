import './header.js';
import './footer.js';
import { cookieUserId, postFetch, displayImage, searchParam } from './component.js';
import { loginCheck } from './header.js';

const login = loginCheck();

if (login === false) {
    alert('로그인 후 이용하실 수 있습니다.');
    location.href = '/';
}

// 쿠키에 저장된 닉네임으로 유저 index를 받아옴
const userData = await postFetch('/users/inquiry', { userNickname: cookieUserId });
// 받아온 유저 index를 변수에 할당
const userIndexId = userData.results[0].id;
// 유저 index 기준으로 게시글을 불러옴
const postData = await postFetch('/posts/inquiry', { userindex: userIndexId });
// 작성한 게시글 총 개수 변수에 할당
const totalData = postData.length;
// 현재 페이지를 변수에 할당
let currentPage = Number(searchParam('page'));
// 유저 index 기준으로 페이징 정보를 받아옴
const pagingData = await postFetch('/posts/mypage-paging', { userindex: userIndexId, page: currentPage });

let viewPage = 10; // 화면에 보여질 페이지 갯수
let viewData = 20; // 화면에 보여질 데이터 갯수
let totalPage = Math.ceil(totalData / viewData); // 총 페이지 갯수 = 총 데이터 / 한화면에 보여질 데이터
let firstPage = currentPage - (currentPage % viewPage) + 1; // 화면에 보여질 첫번 째 페이지
let lastPage = currentPage - (currentPage % viewPage) + viewPage; // 화면에 보여질 마지막 페이지

if (currentPage == 0) currentPage = 1;
if (lastPage > totalPage) lastPage = totalPage;

if (currentPage > totalPage) location.href = `?page=${totalPage}`;

// 10,20,30번째 같은 두번쨰 자리가 0 인 페이지일때 다음으로 넘어가지 않는 조건문
if (currentPage % viewPage == 0) {
    firstPage = currentPage - 9;
    lastPage = currentPage;
}

const count = document.querySelector('#count');
const p = document.createElement('p');

count.prepend(p);
p.textContent = `${postData.length} 개의 게시글이 있습니다.`;

const w = document.createElement('div');
const main = document.querySelector('main');
const pagination = document.createElement('div');

pagination.classList.add('pagination_box');
main.classList.add('main');
w.classList.add('content_box');

main.after(pagination);
main.prepend(w);

const prev = document.createElement('a');
const next = document.createElement('a');
const last = document.createElement('a');
const first = document.createElement('a');

prev.textContent = 'prev';
next.textContent = 'next';
last.textContent = 'last';
first.textContent = 'first';
pagination.prepend(prev);
pagination.prepend(first);
prev.href = '?page=' + (firstPage - 1);
first.href = `?page=1`;
if (currentPage <= 10) {
    prev.style.display = 'none';
    first.style.display = 'none';
}
if (totalPage <= 10 || currentPage == totalPage) {
    next.style.display = 'none';
    last.style.display = 'none';
}

//전체 게시글 조회후 길이만큼 카드박스 생성
for (let i = 0; i < pagingData.results.length; i++) {
    const cardboxDivTag = document.createElement('div');
    const imageboxDivTag = document.createElement('div');
    const titleboxDivTag = document.createElement('div');
    const likeboxDivTag = document.createElement('div');
    const likeCountBox = document.createElement('div');
    const commentCountBox = document.createElement('div');
    const likeIcon = displayImage('../image/heart3.png', '좋아요');
    const commentIcon = displayImage('../image/comment2.png', '댓글');
    const likeCount = document.createElement('p');
    const commentCount = document.createElement('p');
    const thumbnail = displayImage('../image/명치.jpg', '썸네일');
    likeIcon.classList.add('icon');
    commentIcon.classList.add('icon');

    w.prepend(cardboxDivTag);
    cardboxDivTag.prepend(imageboxDivTag);
    imageboxDivTag.after(titleboxDivTag);
    titleboxDivTag.after(likeboxDivTag);
    likeboxDivTag.prepend(likeCountBox);
    likeboxDivTag.append(commentCountBox);
    likeCountBox.prepend(likeIcon);
    likeCountBox.append(likeCount);
    commentCountBox.prepend(commentIcon);
    commentCountBox.append(commentCount);
    imageboxDivTag.appendChild(thumbnail);
    likeCount.textContent = `${pagingData.results[i].like} 개`;
    commentCount.textContent = `${pagingData.results[i].comment} 개`;

    cardboxDivTag.classList.add('card_box');
    imageboxDivTag.classList.add('image_box');
    titleboxDivTag.classList.add('text_box');
    likeboxDivTag.classList.add('text_box');
    likeCountBox.classList.add('like_comment_box');
    commentCountBox.classList.add('like_comment_box');
    // imageboxDivTag.textContent = '이미지공간';
    titleboxDivTag.textContent = pagingData.results[i].title;

    // 이미지 클릭하면 해당 게시글로 이동
    imageboxDivTag.addEventListener('click', function () {
        location.href = `/post/${pagingData.results[i].id}`;
    });
    // 제목 클릭하면 해당 게시글로 이동
    titleboxDivTag.addEventListener('click', function () {
        location.href = `/post/${pagingData.results[i].id}`;
    });
}

// 페이징 목록 만드는 반복분
for (let p = firstPage; p <= lastPage; p++) {
    const paginationItem = document.createElement('a');
    pagination.appendChild(paginationItem);
    paginationItem.textContent = p;
    paginationItem.href = `?page=${p}`;

    if (p == currentPage) {
        paginationItem.classList.add('active');
    } else if (currentPage == 0) {
        document.querySelector('#pagination1').classList.add('active');
    }
}
pagination.append(next);
pagination.append(last);
next.href = '?page=' + (lastPage + 1);
last.href = `?page=${totalPage}`;
