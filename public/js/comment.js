import { displayImage, cookieUserNickname } from './component.js';

// 게시글 인덱스 번호 가져오는 변수
let id = document.location.pathname.split('/')[2];

//댓글 조회

const fetchData = async function () {
    const getData = await fetch('http://localhost:3000/comments/inquiry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            postindexId: id
        })
    });
    const data = await getData.json();
    return data;
};

const commentData = await fetchData();

// console.log(commentData);

const comment = document.querySelector('#comment');

for (let i = 0; i < commentData.length; i++) {
    let usersData = async function () {
        let getData = await fetch('http://localhost:3000/users/inquiry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userNickname: commentData.results[i].writer
            })
        });

        let datas = await getData.json();
        return datas;
    };

    let userData = await usersData();

    const commentBox = document.createElement('div');
    const imageBox = document.createElement('div');
    const commentRight = document.createElement('div');
    const commentId = document.createElement('div');
    const commentContent = document.createElement('div');
    const commentRegistration = document.createElement('div');
    //이미지 파라미터 받아오기
    const profileimage = document.createElement('img');
    profileimage.src = `//localhost:3000${userData.results[0].image}`;
    const writerDiv = document.createElement('div');
    const likeBox = document.createElement('div');
    const likeIcon = displayImage('../image/heart3.png', '좋아요');
    const likeCount = document.createElement('p');
    let content = document.createElement('div');
    const registration = document.createElement('p');
    const lineBox = document.createElement('div');
    const line = document.createElement('div');

    const editBox = document.createElement('div');
    const editItem = document.createElement('div');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    comment.prepend(commentBox);
    commentBox.classList.add('comment_card');
    imageBox.classList.add('image_box');
    commentRight.classList.add('comment_right');
    commentId.classList.add('comment_id');
    commentRegistration.classList.add('comment_registrationDate');
    profileimage.classList.add('icon');
    writerDiv.classList.add('comment_id_box');
    likeBox.classList.add('count_box');
    commentContent.classList.add('comment_content');
    registration.classList.add('registration_font');
    content.classList.add('comment_textarea');
    likeIcon.classList.add('icon');
    lineBox.classList.add('line_box');
    line.classList.add('line');

    editBox.classList.add('comment_registration_box');
    editItem.classList.add('comment_registration_edit_box');
    editBtn.classList.add('comment_registration_edit_button');
    deleteBtn.classList.add('comment_registration_delete_button');

    commentBox.prepend(imageBox);
    commentBox.append(commentRight);

    imageBox.prepend(profileimage);

    commentContent.prepend(content);

    commentRight.prepend(commentId);
    commentId.after(commentContent);
    commentContent.after(commentRegistration);

    commentId.prepend(writerDiv);
    commentId.append(likeBox);
    likeBox.prepend(likeIcon);
    likeBox.append(likeCount);
    likeBox.after(editBox);

    editBox.prepend(editItem);
    editItem.prepend(editBtn);
    editItem.append(deleteBtn);

    // editBox.style.display = 'none';
    editBtn.id = 'edit';
    deleteBtn.id = 'delete';
    editBtn.textContent = '수정';
    deleteBtn.textContent = '삭제';

    commentRegistration.prepend(registration);

    lineBox.prepend(line);

    commentBox.after(lineBox);

    writerDiv.textContent = `${commentData.results[i].writer}`;
    likeCount.textContent = `${commentData.results[i].like} 개`;
    content.innerHTML = `${commentData.results[i].contents}`;
    registration.textContent = `작성시간 : ${commentData.results[i].registration}`;

    // 작성자와 쿠키에 저장된 닉네임과 다르면 수정 및 삭제 불가
    if (writerDiv.textContent !== cookieUserNickname) {
        editBox.style.display = 'none';
    }
}

// 댓글 등록
const commentRegistrationBtn = document.querySelector('#registration');

commentRegistrationBtn.addEventListener('click', function () {
    const comment = document.querySelector('#comment').value;

    if (!comment) return alert('댓글 내용을 입력해 주세요.');

    console.log(comment);
    console.log(id);
    console.log(cookieUserNickname);

    fetch('http://localhost:3000/comments/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            comment: comment,
            writer: cookieUserNickname
        })
    }).then(data => {
        if (data.status == 201) {
            alert('댓글 등록 완료!');
            location.reload();
        } else {
            alert('오류가 발생했습니다.');
        }
    });
});

const editBtn = document.querySelector('#edit');
const deleteBtn = document.querySelector('#delete');

editBtn.addEventListener('click', function () {
    alert('테스트중');
});
