import './header.js';
import './footer.js';
import { cookieUserId, cookieUserNickname } from './component.js';

const imageUploadBtn = document.querySelector('#input-file');
const registrationBtn = document.querySelector('#registration');
const title = document.querySelector('#title').value;
// const content = document.querySelector('#content').value;

const images = []; // 데이터 베이스에 저장된 이미지 indexID 저장하기 위한 배열

// 업로드 버튼 클릭 시 발생 이벤트
// imageUploadBtn.addEventListener('change', async function () {
//     for (let i = 0; i < imageUploadBtn.files.length; i++) {
//         await uploadFile(imageUploadBtn.files[i]);
//     }
// });

// 업로드 버튼 클릭 시 발생 이벤트
imageUploadBtn.addEventListener('change', async function () {
    for (let i = 0; i < imageUploadBtn.files.length; i++) {
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

    const getData = await fetch('http://localhost:3000/posts/image-upload', {
        method: 'POST',
        body: formData
    });
    const data = await getData.json();
    // console.log(data);
    images.push(data.imageIndexId[0]);
    return data;
};

//업로드 이미지 미리보기
// imageUploadBtn.addEventListener('change', async function (e) {
//     // console.log(e.target.files.length);
//     for (let i = 0; i < imageUploadBtn.files.length; i++) {
//         let reader = new FileReader();
//         reader.onload = function (e) {
//             let img = document.createElement('img');
//             img.setAttribute('src', e.target.result);
//             document.querySelector('#contents').appendChild(img);
//         };
//         reader.readAsDataURL(e.target.files[i]);
//     }
// });

//업로드 버튼 클릭시 실행 함수
// const uploadFile = async function (file) {
//     const formData = new FormData();
//     formData.append('image', file);

//     await fetch('http://localhost:3000/posts/image-upload', {
//         method: 'POST',
//         body: formData
//     })
//         .then(res => res.json())
//         .then(data => {
//             images.push(data.imageIndexId[0]); // 데이터베이스에 저장된 indexID 배열에 푸쉬
//             console.log(data.imageURLs);
//         })
//         .catch(err => console.error(err));
// };

//등록 버튼 클릭 시 발생 이벤트
registrationBtn.addEventListener('click', async function () {
    if (cookieUserNickname == undefined) return alert('로그인 후 이용해 주세요.');
    await uploadpost();
});

//등록 버튼 클릭 시 실행 함수
const uploadpost = async function () {
    const title = document.querySelector('#title').value;
    const contents = document.querySelector('#contents').innerHTML;

    if (!title) return alert('제목을 입력해주세요.');

    if (!contents) return alert('내용을 입력해주세요.');

    await fetch('http://localhost:3000/posts/registration', {
        method: 'POST',
        headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            contents: contents,
            images: images,
            writer: cookieUserNickname
        })
    })
        // .then(res => res.json())
        .then(data => {
            if (data.status == 201) {
                alert('게시글 등록 완료!');
                location.href = '/';
            } else {
                alert('오류가 발생했습니다.');
            }
        });
};
