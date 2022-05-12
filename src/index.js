import './header.js';
import './footer.js';
import { displayImage, getFetch, cookieUserNickname, postFetch, searchParam } from './component.js';
// import config from '../config/key.js';

// 전체 게시글 조회하는 fetch
const postData = await getFetch('/posts');
const totalData = postData.length;
// const totalData = 2000;

// 현재 페이지를 변수에 할당
let currentPage = Number(searchParam('page'));
// 페이징 처리된 데이터 불러오는 fetch
const pagingData = await postFetch('/posts/index-paging', { page: currentPage });
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

const main = document.querySelector('main');
main.classList.add('main');
const w = document.createElement('div');
w.classList.add('content_box');
main.prepend(w);

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

const pagingDataReverse = pagingData.results.reverse();

//전체 게시글 조회후 길이만큼 카드박스 생성
for (let i = 0; i < pagingDataReverse.length; i++) {
    const cardboxDivTag = document.createElement('div');
    const imageboxDivTag = document.createElement('div');
    const titleboxDivTag = document.createElement('div');
    const likeboxDivTag = document.createElement('div');
    const likeCountBox = document.createElement('div');
    const commentCountBox = document.createElement('div');
    const likeIcon = displayImage('/image/heart3.png', '좋아요');
    const commentIcon = displayImage('/image/comment2.png', '댓글');
    const likeCount = document.createElement('p');
    const commentCount = document.createElement('p');
    const thumbnail = displayImage(`http://localhost:3000${pagingDataReverse[i].thumbnail}`, '썸네일');
    likeIcon.classList.add('icon');
    commentIcon.classList.add('icon');
    thumbnail.classList.add('thumbnail');

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
    likeCount.textContent = `${pagingDataReverse[i].like} 개`;
    commentCount.textContent = `${pagingDataReverse[i].comment} 개`;

    cardboxDivTag.classList.add('card_box');
    imageboxDivTag.classList.add('image_box');
    titleboxDivTag.classList.add('text_box');
    likeboxDivTag.classList.add('text_box');
    likeCountBox.classList.add('like_comment_box');
    commentCountBox.classList.add('like_comment_box');
    // imageboxDivTag.textContent = '이미지공간';
    titleboxDivTag.textContent = pagingDataReverse[i].title;

    // 이미지 클릭하면 해당 게시글로 이동
    imageboxDivTag.addEventListener('click', function () {
        if (!cookieUserNickname) {
            alert('로그인 후 이용하실 수 있습니다.');
            return (location.href = '/');
        } else {
            location.href = `/post/${pagingDataReverse[i].id}`;
        }
    });
    // 제목 클릭하면 해당 게시글로 이동
    titleboxDivTag.addEventListener('click', function () {
        if (!cookieUserNickname) {
            alert('로그인 후 이용하실 수 있습니다.');
            return (location.href = '/');
        } else {
            location.href = `/post/${pagingDataReverse[i].id}`;
        }
    });
    // 삭제된 게시글은 보여지지 않음
    if (pagingDataReverse[i].delete !== null) {
        cardboxDivTag.style.display = 'none';
    }
}

const searchBtn = document.querySelector('#search_button');
const searchInput = document.querySelector('#search_input');

searchBtn.addEventListener('click', async function () {
    const searchInput = document.querySelector('#search_input').value;
    location.href = `/search?title=${searchInput}`;
});

searchInput.addEventListener('keydown', function (e) {
    if (e.keyCode == 13) {
        const search = document.querySelector('#search_input').value;
        location.href = `/search?title=${search}`;
    }
});

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
