import { displayImage, cookieUserNickname, postFetch, deleteFetch, patchFetch } from './component.js';
import { loginCheck } from './header.js';

const login = loginCheck();

if (login === false) {
    alert('로그인 후 이용하실 수 있습니다.');
    location.href = '/';
}

let url;
if (document.location.hostname === 'localhost') {
    // 개발모드의 url
    url = 'http://localhost:3000';
} else {
    // 배포모드의 url
    url = 'https://api.reci-p.com';
}

// 게시글 인덱스 번호 가져오는 변수
let id = document.location.pathname.split('/')[2];

//댓글 조회
const commentData = await postFetch('/comments/inquiry', { postindexId: id });

const userData = await postFetch('/users/inquiry', { userNickname: cookieUserNickname });
const userindex = await userData.results[0].id;

const comment = document.querySelector('#comment');

// console.log(commentData);

for (let i = 0; i < commentData.length; i++) {
    const commentBox = document.createElement('div');
    const imageBox = document.createElement('div');
    const commentRight = document.createElement('div');
    const commentId = document.createElement('div');
    const commentContent = document.createElement('div');
    const commentRegistration = document.createElement('div');
    const profileimage = document.createElement('img');
    const writerDiv = document.createElement('div');
    const likeBox = document.createElement('div');
    const likeIcon = displayImage('../../image/heart3.png', '좋아요');
    const disLikeIcon = displayImage('../image/blackheart.png', '댓글');
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
    disLikeIcon.classList.add('icon');
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
    // likeBox.prepend(likeIcon);
    likeBox.append(likeCount);
    likeBox.after(editBox);

    editBox.prepend(editItem);
    editItem.prepend(editBtn);
    editItem.append(deleteBtn);

    editBtn.id = 'edit';
    deleteBtn.id = 'delete';
    editBtn.textContent = '수정';
    deleteBtn.textContent = '삭제';

    commentRegistration.prepend(registration);

    lineBox.prepend(line);

    commentBox.after(lineBox);

    // 좋아요를 누른 댓글에는 검은하트로 나오고, 안누른 댓글에는 빈 하트로 나옴
    if (commentData.results[i].commentindex !== null) {
        likeBox.prepend(disLikeIcon);
    } else {
        likeBox.prepend(likeIcon);
    }

    writerDiv.textContent = `${commentData.results[i].writer}`;
    likeCount.textContent = `${commentData.results[i].like} 개`;
    content.innerHTML = `${commentData.results[i].contents}`;
    registration.textContent = `작성시간 : ${commentData.results[i].registration}`;
    profileimage.src = `${url}${commentData.results[i].image}`;

    // 작성자와 쿠키에 저장된 닉네임과 다르면 수정 및 삭제 불가
    if (writerDiv.textContent !== cookieUserNickname) {
        editBox.style.display = 'none';
    }

    // 수정된 댓글은 작성시간이 아닌 수정시간으로 보여줌
    if (commentData.results[i].edit !== null) {
        registration.textContent = `수정시간 : ${commentData.results[i].edit}`;
    }
    // 삭제된 댓글은 보여지지 않음
    if (commentData.results[i].delete !== null) {
        commentBox.style.display = 'none';
        lineBox.style.display = 'none';
    }
    let commentindex = await commentData.results[i].id;
    // let checkLike = await postFetch('http://localhost:3000/comments/check-like', { userindex: userindex, postindex: postindex });

    // 댓글 좋아요 버튼
    likeIcon.addEventListener('click', async function () {
        // alert(commentData.results[i].id);
        const data = await postFetch('/comments/like', { userindex: userindex, commentindex: commentindex });
        if (data.results.affectedRows == 0) {
            return alert('오류가 발생했습니다. 잠시후에 다시 시도해 주세요.');
        } else {
            location.reload();
            return alert('좋아요!');
        }
    });
    //댓글 좋아요 취소
    disLikeIcon.addEventListener('click', async function () {
        // alert(commentData.results[i].id);
        const data = await deleteFetch('/comments/like', { userindex: userindex, commentindex: commentindex });
        if (data.results.affectedRows == 0) {
            return alert('오류가 발생했습니다. 잠시후에 다시 시도해 주세요.');
        } else {
            location.reload();
            return;
        }
    });

    //댓글 수정버튼
    editBtn.addEventListener('click', async function () {
        let contents = content.innerHTML;
        content.remove();
        content = document.createElement('textarea');
        content.classList.add('comment_textarea');
        commentContent.prepend(content);
        content.innerHTML = contents;

        editBtn.style.display = 'none';
        deleteBtn.style.display = 'none';

        const doneBtn = document.createElement('button');
        const cancelBtn = document.createElement('button');
        doneBtn.classList.add('comment_registration_edit_button');
        cancelBtn.classList.add('comment_registration_delete_button');

        editItem.prepend(doneBtn);
        editItem.append(cancelBtn);
        doneBtn.textContent = '완료';
        cancelBtn.textContent = '취소';

        doneBtn.addEventListener('click', async function () {
            const editComment = content.value;
            const id = commentData.results[i].id;

            const data = await patchFetch('/comments/edit', { id: id, editComment: editComment });

            console.log(data.data.affectedRows);

            if (data.data.affectedRows == 1) {
                alert('댓글 수정 완료!');
                location.reload();
            }
        });

        cancelBtn.addEventListener('click', function () {
            location.reload();
            return;
        });
    });

    // 댓글 삭제버튼
    deleteBtn.addEventListener('click', async function () {
        const id = commentData.results[i].id;

        const data = await deleteFetch('/comments', { id: id });

        if (data.data.affectedRows == 1) {
            alert('댓글 삭제 완료!');
            location.reload();
        }
    });
}

// 댓글 등록
const commentRegistrationBtn = document.querySelector('#registration');

commentRegistrationBtn.addEventListener('click', async function () {
    const comment = document.querySelector('#comment_content').value;
    const userData = await postFetch('/users/inquiry', { userNickname: cookieUserNickname });
    if (!comment) return alert('댓글 내용을 입력해 주세요.');

    const data = await postFetch('/comments/registration', {
        postindex: id,
        comment: comment,
        writer: cookieUserNickname,
        userindex: userData.results[0].id
    });

    if (data.message == 'done') {
        alert('댓글 등록 완료!');
        return location.reload();
    }
});
