// 이미지 불러오기 펑션
function displayImage(src, alt) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;

    return img;
}

const cookieUserId = document.cookie.split('=')[1];

export { displayImage, cookieUserId };
