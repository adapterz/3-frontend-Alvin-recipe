import './header.js';
import './footer.js';
import { displayImage } from './component.js';

// 전체 게시글 조회하는 fetch
const fetchData = async function () {
    const getData = await fetch('http://localhost:3000/post');
    const data = await getData.json();
    return data;
};

const postData = await fetchData();

const main = document.querySelector('main');
main.classList.add('main');
const w = document.createElement('div');
w.classList.add('content_box');
main.prepend(w);

//전체 게시글 조회후 길이만큼 카드박스 생성
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
    likeCount.textContent = postData.results[i].like + ' 개';
    commentCount.textContent = postData.results[i].comment + ' 개';

    cardboxDivTag.classList.add('card_box');
    imageboxDivTag.classList.add('image_box');
    titleboxDivTag.classList.add('text_box');
    likeboxDivTag.classList.add('text_box');
    likeCountBox.classList.add('like_comment_box');
    commentCountBox.classList.add('like_comment_box');
    imageboxDivTag.textContent = '이미지공간';
    titleboxDivTag.textContent = postData.results[i].title;
}
