# scssak_fe

## commit convention

- template
  - `[type]: [subject]`
  - ex) feat: 리액트 프로젝트 생성
- type 종류
  - feat: 새로운 기능 추가
  - fix: 버그 수정
  - docs: 문서 수정
  - style: 코드 포맷팅 등 코드 변경이 없는 경우
  - refactor: 코드 리팩토링
  - test: 테스트 코드 추가
  - chore: production code와 무관한 경우(.gitignore, build.gradle 등 수정)
  - comment: 주석 추가 및 변경
  - remove: 파일, 폴더 삭제
  - rename: 파일, 폴더명 수정

## 프로젝트 구조

#### 241113 1421 ver.

```
📦src
 ┣ 📂assets
 ┃ ┣ 📂fonts
 ┃ ┃ ┣ 📜GmarketSansTTFBold.ttf
 ┃ ┃ ┣ 📜GmarketSansTTFLight.ttf
 ┃ ┃ ┣ 📜GmarketSansTTFMedium.ttf
 ┃ ┃ ┗ 📜Yeongdeok Sea.ttf
 ┃ ┣ 📂images
 ┃ ┃ ┣ 📜default_thumbnail.png
 ┃ ┃ ┣ 📜dropdown_arrow_down.png
 ┃ ┃ ┣ 📜dropdown_arrow_up.png
 ┃ ┃ ┣ 📜go_back_arrow.png
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜logo.png
 ┃ ┃ ┣ 📜mailbox-01.png
 ┃ ┃ ┣ 📜mailbox-02.png
 ┃ ┃ ┣ 📜mailbox-03.png
 ┃ ┃ ┣ 📜mailbox-04.png
 ┃ ┃ ┣ 📜mailbox-05.png
 ┃ ┃ ┣ 📜mailbox-with-notification-01.png
 ┃ ┃ ┣ 📜mailbox-with-notification-02.png
 ┃ ┃ ┣ 📜mailbox-with-notification-03.png
 ┃ ┃ ┣ 📜mailbox-with-notification-04.png
 ┃ ┃ ┣ 📜mailbox-with-notification-05.png
 ┃ ┃ ┗ 📜picture_button.png
 ┃ ┗ 📂styles
 ┃ ┃ ┣ 📜ArticleBoardPage.css
 ┃ ┃ ┣ 📜ArticleDetailPage.css
 ┃ ┃ ┣ 📜ArticleForm.css
 ┃ ┃ ┣ 📜ArticleList.css
 ┃ ┃ ┣ 📜ArticleWritePage.css
 ┃ ┃ ┗ 📜ConfirmModal.css
 ┣ 📂components
 ┃ ┣ 📂article
 ┃ ┃ ┣ 📜ArticleForm.js
 ┃ ┃ ┗ 📜ArticleList.js
 ┃ ┣ 📂common
 ┃ ┃ ┗ 📜ConfirmModal.js
 ┃ ┣ 📂login
 ┃ ┃ ┗ 📜LoginForm.jsx
 ┃ ┣ 📂mailbox
 ┃ ┃ ┣ 📜MailList.jsx
 ┃ ┃ ┗ 📜MoveToMailWriteButton.jsx
 ┃ ┣ 📂mailboxlist
 ┃ ┃ ┗ 📜MailBoxList.jsx
 ┃ ┣ 📂mailwrite
 ┃ ┃ ┗ 📜MailWriteForm.jsx
 ┃ ┗ 📂main
 ┃ ┃ ┣ 📜AttendanceButton.jsx
 ┃ ┃ ┣ 📜NoticeList.jsx
 ┃ ┃ ┗ 📜TardyList.jsx
 ┣ 📂pages
 ┃ ┣ 📜ArticleBoardPage.js
 ┃ ┣ 📜ArticleDetailPage.js
 ┃ ┣ 📜ArticleEditPage.js
 ┃ ┣ 📜ArticleWritePage.js
 ┃ ┣ 📜LoginPage.jsx
 ┃ ┣ 📜MailboxListPage.jsx
 ┃ ┣ 📜MailboxPage.jsx
 ┃ ┣ 📜MailWritePage.jsx
 ┃ ┗ 📜MainPage.jsx
 ┣ 📂router
 ┃ ┣ 📜AppRouter.jsx
 ┃ ┗ 📜Routes.js
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜App.test.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┣ 📜logo.png
 ┣ 📜reportWebVitals.js
 ┗ 📜setupTests.js
```