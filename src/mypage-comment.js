import './header.js';
import './footer.js';
import { cookieUserId, postFetch, displayImage, searchParam } from './component.js';

const count = document.querySelector('#count');
const p = document.createElement('p');
// 쿠키에 저장된 닉네임으로 유저 index를 받아옴
const userData = await postFetch('/users/inquiry', { userNickname: cookieUserId });
// 받아온 유저 index를 변수에 할당
const userIndexId = userData.results[0].id;
// 유저 index 기준으로 댓글을 불러옴
const commentData = await postFetch('/comments/user-inquiry', { userindex: userIndexId });
// 작성한 게시글 총 개수 변수에 할당
const totalData = commentData.length;
// 현재 페이지를 변수에 할당
let currentPage = Number(searchParam('page'));
// 유저 index 기준으로 페이징 정보를 받아옴
const pagingData = await postFetch('/comments/mypage-paging', { userindex: userIndexId, page: currentPage });

count.prepend(p);
p.textContent = `${commentData.length} 개의 댓글이 있습니다.`;
const main = document.querySelector('main');

let viewPage = 10; // 화면에 보여질 페이지 갯수
let viewData = 5; // 화면에 보여질 데이터 갯수
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

const pagination = document.createElement('div');
pagination.classList.add('pagination_box');
main.after(pagination);

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

for (let i = 0; i < pagingData.results.length; i++) {
    const commentCard = document.createElement('div');
    const commentBox = document.createElement('div');
    const titleBox = document.createElement('div');
    const commentContentBox = document.createElement('div');
    const content = document.createElement('div');
    const registration = document.createElement('div');
    const likeBox = document.createElement('div');
    const likeIcon = displayImage('../image/heart3.png', '좋아요');
    const likeCount = document.createElement('p');
    const lineBox = document.createElement('div');
    const line = document.createElement('div');

    commentCard.classList.add('comment_card');
    commentBox.classList.add('comment_box');
    titleBox.classList.add('title_box');
    commentContentBox.classList.add('comment_content_box');
    registration.classList.add('comment_registration');
    likeBox.classList.add('like_box');
    likeIcon.classList.add('icon');
    lineBox.classList.add('line_box');
    line.classList.add('line');

    main.prepend(commentCard);
    commentCard.prepend(commentBox);
    commentCard.append(likeBox);

    commentBox.prepend(titleBox);
    titleBox.after(commentContentBox);
    commentContentBox.after(registration);

    commentContentBox.prepend(content);

    likeBox.prepend(likeIcon);
    likeBox.append(likeCount);

    lineBox.prepend(line);
    commentCard.after(lineBox);

    titleBox.textContent = pagingData.results[i].title;
    content.textContent = pagingData.results[i].contents;
    registration.textContent = `작성시간 : ${pagingData.results[i].registration}`;
    likeCount.textContent = `${pagingData.results[i].like} 개`;

    // 제목 클릭하면 해당 게시글로 이동
    titleBox.addEventListener('click', function () {
        location.href = `/post/${pagingData.results[i].postindex}`;
    });
    content.addEventListener('click', function () {
        location.href = `/post/${pagingData.results[i].postindex}`;
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
