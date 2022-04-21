// 이미지 불러오기 펑션
function displayImage(src, alt) {
    const img = document.createElement('img');
    if (alt == null) alt = '없음';
    img.src = src;
    img.alt = alt;

    return img;
}

const cookieUserId = document.cookie.split('=')[1];
const cookieUserNickname = document.cookie.split('=')[1];

const postFetch = async function (url, body) {
    const getData = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await getData.json();
    return data;
};

export { displayImage, cookieUserId, cookieUserNickname, postFetch };
