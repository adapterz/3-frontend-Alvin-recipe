import './header.js';
import './footer.js';

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

console.log(postData);

const postBox = document.querySelector('#post_box');
const writerBox = document.createElement('div');
const registrationBox = document.createElement('div');
const writer = document.createElement('p');
const registration = document.createElement('p');
const views = document.createElement('p');
const title = document.createElement('p');
const content = document.createElement('div');

postBox.classList.add('post_box');
writerBox.classList.add('writer_box');
writer.classList.add('writer_font');
registrationBox.classList.add('registration_box');
registration.classList.add('registration_font');
views.classList.add('registration_font');
title.classList.add('title_font');
content.classList.add('content_textarea');

postBox.append(writerBox);
writerBox.prepend(writer);
writerBox.append(registrationBox);
registrationBox.prepend(registration);
registrationBox.append(views);
writerBox.after(title);
title.after(content);

writer.textContent = postData.results[0].writer;
registration.textContent = postData.results[0].registration;
views.textContent = `조회수 ${postData.results[0].views}`;

title.textContent = postData.results[0].title;
content.innerHTML = postData.results[0].contents;
