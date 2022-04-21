const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '../public/html/index.html'));
});

router.get('/account/login', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '../public/html/login.html'));
});

router.get('/account/signup', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '../public/html/signup.html'));
});

router.get('/account/find/id', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '../public/html/id_find.html'));
});

router.get('/account/find/pw', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '../public/html/password_find.html'));
});

router.get('/account/mypage', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '../public/html/mypage.html'));
});

router.get('/account/mypage/post', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '../public/html/mypage_post.html'));
});

router.get('/account/mypage/comment', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '../public/html/mypage_comment.html'));
});

router.get('/login_index', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '../public/html/login_index.html'));
});

router.get('/post/registration', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '../public/html/post_registration.html'));
});

router.get('/post/edit', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '../public/html/post_edit.html'));
});

router.get('/post/:id', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '../public/html/post_detail.html'));
});

router.get('/search', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/html/search.html'));
});

module.exports = router;
