const main = document.querySelector('main');
const cardboxDivTag = document.createElement('div');
const imageboxDivTag = document.createElement('div');
const titleboxDivTag = document.createElement('div');
const likeboxDivTag = document.createElement('div');
const likeCountBox = document.createElement('div');
const commentCountBox = document.createElement('div');
const likeIcon = document.createElement('i');
const commentIcon = document.createElement('i');
const likeCount = document.createElement('p');
const commentCount = document.createElement('p');

main.classList.add('main');

main.prepend(cardboxDivTag);
cardboxDivTag.prepend(imageboxDivTag);
imageboxDivTag.after(titleboxDivTag);
titleboxDivTag.after(likeboxDivTag);
likeboxDivTag.prepend(likeCountBox);
likeboxDivTag.append(commentCountBox);
likeCountBox.prepend(likeIcon);
likeCountBox.append(likeCount);
commentCountBox.prepend(commentIcon);
commentCountBox.append(commentCount);
likeIcon.setAttribute('class', 'fa-regular fa-comment like_comment_image');
likeCount.textContent = '100개';
commentIcon.setAttribute('class', 'fa-regular fa-comment like_comment_image');
commentCount.textContent = '100개';

cardboxDivTag.classList.add('card_box');
imageboxDivTag.classList.add('image_box');
titleboxDivTag.classList.add('text_box');
likeboxDivTag.classList.add('text_box');
likeCountBox.classList.add('like_comment_box');
commentCountBox.classList.add('like_comment_box');
imageboxDivTag.textContent = '이미지공간';
titleboxDivTag.textContent = '제목입니다';
