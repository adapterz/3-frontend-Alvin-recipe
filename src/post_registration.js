import './header.js';
import './footer.js';
import { cookieUserNickname, postFetch } from './component.js';

const imageUploadBtn = document.querySelector('#input-file');
const registrationBtn = document.querySelector('#registration');
const title = document.querySelector('#title').value;
const textarea = document.querySelector('#contents');

const images = []; // 데이터 베이스에 저장된 이미지 indexID 저장하기 위한 배열

textarea.addEventListener('paste', async function (e) {
    let clipboardData = e.clipboardData || window.clipboardData;

    if (clipboardData.types == 'Files') {
        const fileName = clipboardData.files[0].name;
        const fileExt = fileName.split('.').pop();

        if (clipboardData.files.length > 1) return alert('이미지 파일은 1장씩 붙여넣기 해주세요.');

        if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'gif') {
            const file = clipboardData.files[0];
            uploadFile(file);
        } else {
            return alert('이미지 파일이 아닙니다.');
        }
    } else if (clipboardData.types == 'text/plain') {
    } else {
        return alert('이미지 파일이 아닙니다.');
    }
});

// 업로드 버튼 클릭 시 발생 이벤트
// imageUploadBtn.addEventListener('change', async function () {
//     for (let i = 1; i <= imageUploadBtn.files.length; i++) {
//         await uploadFile(imageUploadBtn.files[i]);
//     }
// });

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
    console.log(file);
    const formData = new FormData();
    formData.append('image', file);

    const getData = await fetch('http://localhost:3000/posts/image-upload', {
        method: 'POST',
        body: formData
    });
    const data = await getData.json();

    console.log(data);
    images.push(data.imageIndexId[0]);
    return data;
};

//등록 버튼 클릭 시 발생 이벤트
registrationBtn.addEventListener('click', async function () {
    const contents = document.querySelector('#contents').innerHTML;
    console.log(contents);
    if (cookieUserNickname == undefined) return alert('로그인 후 이용해 주세요.');
    await uploadpost();
});

//등록 버튼 클릭 시 실행 함수
const uploadpost = async function () {
    const userData = await postFetch('/users/inquiry', { userNickname: cookieUserNickname });
    const title = document.querySelector('#title').value;
    const contents = document.querySelector('#contents').innerHTML;

    if (!title) return alert('제목을 입력해주세요.');

    if (!contents) return alert('내용을 입력해주세요.');

    const data = await postFetch('/posts/registration', {
        title: title,
        contents: contents,
        images: images,
        writer: cookieUserNickname,
        userindex: userData.results[0].id
    });

    if (data.message == 'done') {
        alert('게시글 등록 완료!');
        return (location.href = '/');
    }
};
