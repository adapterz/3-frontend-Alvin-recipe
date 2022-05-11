# For recipe
**레시피 공유 사이트 입니다!**  
[For recipe](https://reci-p.com, "For recipe 이동")  

</br></br>

# 폴더 구조



```
3-frontend-Alvin-recipe
├─ .eslintrc.json
├─ .git
├─ .gitignore
├─ .prettierignore
├─ .prettierrc.json
├─ app.js // 서버 메인 실행
├─ config
│  ├─ key.js
│  └─ production.js
├─ package-lock.json
├─ package.json
├─ public
│  ├─ css // CSS 코드
│  │  ├─ fd
│  │  ├─ find.css
│  │  ├─ index.css
│  │  ├─ login.css
│  │  ├─ mypage.css
│  │  ├─ post.css
│  │  ├─ post_detail.css
│  │  ├─ signup.css
│  │  └─ style.css
│  └─ html // HTML 코드
│     ├─ id_find.html
│     ├─ index.html
│     ├─ login.html
│     ├─ login_index.html
│     ├─ mypage.html
│     ├─ mypage_comment.html
│     ├─ mypage_post.html
│     ├─ password_find.html
│     ├─ post_detail.html
│     ├─ post_detail_hiden.html
│     ├─ post_edit copy.html
│     ├─ post_edit.html
│     ├─ post_registration.html
│     ├─ search.html
│     └─ signup.html
├─ README.md
├─ routes
│  └─ index.js
└─ src // 자바스크립트 코드
   ├─ cardbox.js
   ├─ comment.js
   ├─ component.js
   ├─ footer.js
   ├─ header.js
   ├─ id_find.js
   ├─ index.js
   ├─ login.js
   ├─ mypage-comment.js
   ├─ mypage-post.js
   ├─ mypage.js
   ├─ password_find.js
   ├─ post_detail.js
   ├─ post_edit.js
   ├─ post_registration.js
   ├─ search.js
   └─ signup.js

```

</br>

# 주요 기능

+ 페이징
+ Users
    + 회원가입
    + 회원정보 수정
    + 로그인
    + 로그아웃
    + 프로필 이미지 변경
    + 아이디 찾기
    + 임시 비밀번호 발급
    + 이메일 인증
    + 회원탈퇴  
</br>
+ Posts
    + 게시글 쓰기
    + 게시글 검색
    + 게시글 상세보기
    + 게시글 삭제
    + 게시글 수정
    + 게시글 좋아요
    + 내가 쓴 게시글 조회  
</br>
+ Comments
    + 댓글 등록
    + 댓글 조회
    + 댓글 수정
    + 댓글 삭제
    + 댓글 좋아요
    + 내가 쓴 댓글 조회  
</br>
</br>

# 프로젝트 설계도

![캡처](https://user-images.githubusercontent.com/97275939/167358855-a5f1329c-4e8c-4b7b-97bd-27c1aa126f53.PNG)

</br>

# 문제점과 해결 방법

게시글 등록할 때, 이미지 업로드를 하면 이미지 미리볼수가 있어서, 사용자는 미리보기를 하여서 위치를 설정하고, 그 위치에 따라 텍스트도 입력을 하는데 FileReader를 사용해서 저장을 하면 base64로 인코딩이 되어서 저장이 되면서 알수 없는 문자가 너무 많이 생기고, 저장된 게시글을 불러올 때 이미지를 불러오지 못했습니다

FileReader를 사용하지 않고 이미지 미리보기, 게시글 저장을 하게 된다면 이미지 위치와 텍스트 위치를 입력받은 그대로 출력 시킬 수 있기 때문에 FileReader를 사용 안하고, 이미지 업로드 시킬 때 서버에 이미지 저장을시키고, 저장 시킨 이미지파일 이름을 불러와서 이미지 미리보기 기능을 변경 후 innerHTML로 데이터베이스에 저장을 시켜서 입력받은 그대로 저장을 시키고, 게시글 상세보기 할때에는 입력받은 그대로 출력을 시킬 수 있었습니다.

</br>

# 프로젝트 시연 영상

</br>

# 추후에 코드 개선할 점들

+ css코드 중복되는 부분 합치기

</br>

# 회고 다이어리

자주쓰는 함수를 컴포넌트화 시키면서 그동안 헷갈렸던 인자와 매개변수에 대해 좀 더 확실히 알 수 있었다.  
프론트엔드 개발하면서 제일 크게 느낀건 '당연하게 되는건 없다' 였었다. 사실 게시글 등록할 때 이미지를 업로드를 한다면, 이미지 미리보기는 기본으로 되는건 줄 알았었는데 이것또한 미리보기 기능부터 사이즈 조절까지 전부 다 코드를 짜놔야 된다는 걸 알게 된 후 '당연하게 되는건 없다'라는 생각이 엄청 커졌었다. 그러면서 내가 사용하고 있던 웹 페이지 개발자들이 존경스러워졌었다.


</br>

# 느낀점

프론트엔드는 생각해야 할 게 엄청 많을것 같다. 수십가지의 핸드폰 모델, 수십가지의 브라우저들의 호환과 그에맞는 사이즈 대응.. 개인적인 생각이지만 프론트엔트 개발자는 미적감각도 어느정도 중요할거 같다. 그동안 몰랐었지만 나는 미적감각이 좀 부족한 것 같다.. 때문에 최대한 깔끔하게 하고자 했던 UI는 너무 없어보이는 결과를 초래했다.. 처음엔 화면에 보이는 게 별로 없으면 깔끔하겠지 라는 생각과 다채로운 색보단 블랙&화이트로 구성했는데 완성 시켜놓고 다른 홈페이지들을 둘러보니 좀 부족한 게 많아보였지만 있어야 할 건 다 있으니까 나름 만족한다!  



