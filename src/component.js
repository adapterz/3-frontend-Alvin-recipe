let url;
if (document.location.hostname === 'localhost') {
    // 개발모드의 url
    url = 'http://localhost:3000';
} else {
    // 배포모드의 url
    url = 'a';
}

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

const getFetch = async function (path) {
    const getData = await fetch(url + path);
    const data = await getData.json();
    return data;
};

const postFetch = async function (path, body) {
    const postData = await fetch(url + path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await postData.json();
    return data;
};

const patchFetch = async function (path, body) {
    const getData = await fetch(url + path, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await getData.json();
    return data;
};

const deleteFetch = async function (path, body) {
    const getData = await fetch(url + path, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await getData.json();
    return data;
};

function setCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        var expires = '; expires=' + date.toGMTString();
    } else {
        var expires = '';
    }

    document.cookie = name + '=' + value + expires + '; path=/';
}
function searchParam(key) {
    return new URLSearchParams(location.search).get(key);
}

export { displayImage, cookieUserId, cookieUserNickname, getFetch, postFetch, patchFetch, deleteFetch, setCookie, searchParam };
