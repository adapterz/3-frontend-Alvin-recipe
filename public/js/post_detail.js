import './header.js';
import './footer.js';
import './comment.js';
import { displayImage } from './component.js';

// 게시글 인덱스 번호 가져오는 변수
let id = document.location.pathname.split('/')[2];

const fetchData = async function () {
    const getData = await fetch('http://localhost:3000/posts/view', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    });
    const data = await getData.json();
    return data;
};

const postData = await fetchData();

const postBox = document.querySelector('#post_box');
const writerBox = document.createElement('div');
const registrationBox = document.createElement('div');
const writer = document.createElement('p');
const registration = document.createElement('p');
const views = document.createElement('p');
const title = document.createElement('p');
const content = document.createElement('div');
const infoBox = document.createElement('div');
const likeBox = document.createElement('div');
const commentBox = document.createElement('div');
const likeIcon = displayImage('../../image/heart3.png', '좋아요');
const commentIcon = displayImage('../../image/comment2.png', '댓글');
const likeCount = document.createElement('p');
const commentCount = document.createElement('p');
const line = document.createElement('div');

postBox.classList.add('post_box');
writerBox.classList.add('writer_box');
writer.classList.add('writer_font');
registrationBox.classList.add('registration_box');
registration.classList.add('registration_font');
views.classList.add('registration_font');
title.classList.add('title_font');
content.classList.add('content_textarea');
infoBox.classList.add('info_box');
likeBox.classList.add('count_box');
commentBox.classList.add('count_box');
likeIcon.classList.add('icon');
commentIcon.classList.add('icon');

postBox.append(writerBox);
writerBox.prepend(writer);
writerBox.append(registrationBox);
registrationBox.prepend(registration);
registrationBox.append(views);
writerBox.after(title);
title.after(content);
content.after(infoBox);
infoBox.prepend(likeBox);
infoBox.append(commentBox);
likeBox.prepend(likeIcon);
likeBox.append(likeCount);
commentBox.prepend(commentIcon);
commentBox.append(commentCount);
infoBox.after(line);

writer.textContent = postData.results[0].writer;
registration.textContent = postData.results[0].registration;
views.textContent = `조회수 ${postData.results[0].views}`;

title.textContent = postData.results[0].title;
content.innerHTML = postData.results[0].contents;

likeCount.textContent = `${postData.results[0].like} 개`;
commentCount.textContent = `${postData.results[0].comment} 개`;

// console.log(postData.results[0]);

likeIcon.addEventListener('click', function () {
    alert('좋아용');
});
