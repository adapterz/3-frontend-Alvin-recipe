import './header.js';
import './footer.js';
import { cookieUserNickname, postFetch, patchFetch } from './component.js';
import { loginCheck } from './header.js';

const login = loginCheck();

if (login === false) {
    alert('로그인 후 이용하실 수 있습니다.');
    location.href = '/';
}

const imageUploadBtn = document.querySelector('#input-file');
const editBtn = document.querySelector('#registration');
const title = document.querySelector('#title');
const contents = document.querySelector('#contents');
const cancleBtn = document.querySelector('#cancelBtn');

let id = document.location.pathname.split('/')[3];

const postData = await postFetch('/posts/view', { id: id });

title.value = postData.results[0].title;
contents.innerHTML = postData.results[0].contents;

const images = []; // 데이터 베이스에 저장된 이미지 indexID 저장하기 위한 배열

// 업로드 버튼 클릭 시 발생 이벤트
imageUploadBtn.addEventListener('change', async function () {
    for (let i = 1; i <= imageUploadBtn.files.length; i++) {
        await uploadFile(imageUploadBtn.files[i]);
    }
});
// 업로드 버튼 눌렀을때 이미지 미리보기
imageUploadBtn.addEventListener('change', async function () {
    for (let i = 0; i < imageUploadBtn.files.length; i++) {
        const data = await uploadFile(imageUploadBtn.files[i]);
        let img = document.createElement('img');
        img.src = `//localhost:3000${data.imageURLs}`;
        document.querySelector('#contents').appendChild(img);
    }
});

//업로드 버튼 클릭시 실행 함수
const uploadFile = async function (file) {
    const formData = new FormData();
    formData.append('image', file);

    const getData = await fetch('/posts/image-upload', {
        method: 'POST',
        body: formData
    });
    const data = await getData.json();
    images.push(data.imageIndexId[0]);
    return data;
};

//수정 버튼 클릭 시 발생 이벤트
editBtn.addEventListener('click', async function () {
    if (cookieUserNickname == undefined) return alert('로그인 후 이용해 주세요.');
    await uploadpost();
});

//수정 버튼 클릭 시 실행 함수
const uploadpost = async function () {
    const userData = await postFetch('/users/inquiry', { userNickname: cookieUserNickname });
    const title = document.querySelector('#title').value;
    const contents = document.querySelector('#contents').innerHTML;

    if (!title) return alert('제목을 입력해주세요.');

    if (!contents) return alert('내용을 입력해주세요.');

    const data = await patchFetch('/posts/edit', {
        id: id,
        editTitle: title,
        editContents: contents
    });

    if (data.results.affectedRows == 0) {
        return alert('오류가 발생했습니다. 잠시후에 다시 시도해 주세요.');
    } else {
        location.href = `/post/${id}`;
        return alert('수정 완료!');
    }
};

cancleBtn.addEventListener('click', function () {
    location.href = `/post/${id}`;
});
