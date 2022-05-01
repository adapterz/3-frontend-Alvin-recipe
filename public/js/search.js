import './header.js';
import './footer.js';
import { displayImage, postFetch } from './component.js';

// url 에서 ? 뒤에 값을 가져옴
const url = document.location.search;
// 한글 깨짐으로 인하여 디코딩
const search = decodeURI(url);
// 디코딩 후 검색어만 title 변수에 담기
const title = search.split('=')[1];

// 데이터베이스에 저장된 게시글 중 제목 검색으로 데이터를 받아옴
const postData = await postFetch('http://localhost:3000/posts/search', { title: title });

const main = document.querySelector('main');
main.classList.add('main');
const w = document.createElement('div');
w.classList.add('content_box');
main.prepend(w);

//게시글 검색후 길이만큼 카드박스 생성
for (let i = 0; i < postData.length; i++) {
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
    likeCount.textContent = `${postData.results[i].like} 개`;
    commentCount.textContent = `${postData.results[i].comment} 개`;

    cardboxDivTag.classList.add('card_box');
    imageboxDivTag.classList.add('image_box');
    titleboxDivTag.classList.add('text_box');
    likeboxDivTag.classList.add('text_box');
    likeCountBox.classList.add('like_comment_box');
    commentCountBox.classList.add('like_comment_box');
    // imageboxDivTag.textContent = '이미지공간';
    titleboxDivTag.textContent = postData.results[i].title;

    // 이미지 클릭하면 해당 게시글로 이동
    imageboxDivTag.addEventListener('click', function () {
        location.href = `/post/${postData.results[i].id}`;
    });
    // 제목 클릭하면 해당 게시글로 이동
    titleboxDivTag.addEventListener('click', function () {
        location.href = `/post/${postData.results[i].id}`;
    });
}

const searchBtn = document.querySelector('#search_button');
const searchInput = document.querySelector('#search_input');

searchBtn.addEventListener('click', async function () {
    const search = document.querySelector('#search_input').value;
    location.href = `/search?title=${search}`;
});

searchInput.addEventListener('keydown', function (e) {
    if (e.keyCode == 13) {
        const search = document.querySelector('#search_input').value;
        location.href = `/search?title=${search}`;
    }
});
