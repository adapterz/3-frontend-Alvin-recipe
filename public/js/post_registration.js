import './header.js';
import './footer.js';
import { cookieUserId } from './component.js';

const imageUploadBtn = document.querySelector('#input-file');
const registrationBtn = document.querySelector('#registration');
const title = document.querySelector('#title').value;
// const content = document.querySelector('#content').value;

const images = []; // 데이터 베이스에 저장된 이미지 indexID 저장하기 위한 배열

// 업로드 버튼 클릭 시 발생 이벤트
imageUploadBtn.addEventListener('change', async function () {
    for (let i = 0; i < imageUploadBtn.files.length; i++) {
        await uploadFile(imageUploadBtn.files[i]);
    }
});

//업로드 이미지 미리보기
imageUploadBtn.addEventListener('change', async function (e) {
    // console.log(e.target.files.length);
    for (let i = 0; i < imageUploadBtn.files.length; i++) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let img = document.createElement('img');
            img.setAttribute('src', e.target.result);
            document.querySelector('#contents').appendChild(img);
        };
        reader.readAsDataURL(e.target.files[i]);
    }
});

//업로드 버튼 클릭시 실행 함수
const uploadFile = async function (file) {
    const formData = new FormData();
    formData.append('image', file);

    await fetch('http://localhost:3000/post/upload', {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            images.push(data.imageIndexId[0]); // 데이터베이스에 저장된 indexID 배열에 푸쉬
            console.log(data.imageURL);
        })
        .catch(err => console.error(err));
};

//등록 버튼 클릭 시 발생 이벤트
registrationBtn.addEventListener('click', async function () {
    if (cookieUserId == undefined) return alert('로그인 후 이용해 주세요.');
    await uploadpost();
});

//등록 버튼 클릭 시 실행 함수
const uploadpost = async function () {
    const title = document.querySelector('#title').value;
    const contents = document.querySelector('#contents').innerText;

    console.log(contents);

    if (!title) return alert('제목을 입력해주세요.');

    if (!contents) return alert('내용을 입력해주세요.');

    await fetch('http://localhost:3000/post', {
        method: 'POST',
        headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            contents: contents,
            images: images,
            writer: cookieUserId
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

// function addBox() {
//     const list = document.querySelector('ol');

//     const li = document.createElement('li');
//     const uploadBox = document.createElement('div');

//     const label = document.createElement('label');
//     const inputFile = document.createElement('input');

//     const imgBox = document.createElement('div');
//     const img = document.createElement('img');

//     const contentBox = document.createElement('div');
//     const textarea = document.createElement('textarea');

//     inputFile.classList.add('input_file');
//     inputFile.id = 'input-file';
//     inputFile.multiple = 'multiple';
//     inputFile.type = 'file';
//     inputFile.accept = 'image/*';

//     label.classList.add('input_file_button');
//     label.htmlFor = 'input-file';
//     label.textContent = '업로드';

//     uploadBox.prepend(label);
//     uploadBox.prepend(inputFile);

//     li.classList.add('input_box');
//     uploadBox.classList.add('upload');
//     imgBox.classList.add('img_box');
//     contentBox.classList.add('content_box');
//     textarea.classList.add('test');
//     textarea.placeholder = '내용을 입력해주세요.';

//     list.appendChild(li);
//     li.prepend(uploadBox);
//     uploadBox.after(imgBox);
//     imgBox.after(contentBox);

//     imgBox.prepend(img);

//     contentBox.prepend(textarea);

//     list.appendChild(li);
// }

// function addBox() {
// for (let i = 0; i < 10; i++) {
//     const list = document.querySelector('ol');

//     const li = document.createElement('li');
//     const uploadBox = document.createElement('div');

//     const label = document.createElement('label');
//     const inputFile = document.createElement('input');

//     const imgBox = document.createElement('div');
//     const img = document.createElement('img');

//     const contentBox = document.createElement('div');
//     const textarea = document.createElement('textarea');

//     inputFile.classList.add('input_file');
//     inputFile.id = 'input-file' + i;
//     inputFile.multiple = 'multiple';
//     inputFile.type = 'file';
//     inputFile.accept = 'image/*';

//     label.classList.add('input_file_button');
//     label.htmlFor = 'input-file';
//     label.textContent = '업로드';

//     uploadBox.prepend(label);
//     uploadBox.prepend(inputFile);

//     li.classList.add('input_box');
//     uploadBox.classList.add('upload');
//     imgBox.classList.add('img_box');
//     imgBox.id = 'img-box' + i;
//     contentBox.classList.add('content_box');
//     textarea.classList.add('test');
//     textarea.placeholder = '내용을 입력해주세요.';

//     list.appendChild(li);
//     li.prepend(uploadBox);
//     uploadBox.after(imgBox);
//     imgBox.after(contentBox);

//     imgBox.prepend(img);

//     contentBox.prepend(textarea);

//     list.appendChild(li);

// }
// }

// const addBtn = document.querySelector('#test');

// addBtn.addEventListener('click', async function () {
//     addBox();
// });

// imageUploadBtn.addEventListener('change', async function (e) {
//     console.log(e.target.files);

//     let reader = new FileReader();
//     reader.onload = function (e) {
//         let img = document.createElement('img');
//         img.setAttribute('src', e.target.result);
//         document.querySelector('#img_box' + i).appendChild(img);
//     };
//     reader.readAsDataURL(e.target.files[0]);
// });

// const list = document.querySelector('ol');

// for (let i = 0; i < list.length; i++) {
//     console.log(list[i]);
// }
