# scssak_fe

## commit convention

- template
  - `[type]: [subject] [date] [time]`
  - ex) feat: 리액트 프로젝트 생성 241112 1730
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
 ┣ 📂apis
 ┃ ┣ 📜apiSettings.js
 ┃ ┗ 📜apiUrls.js
 ┣ 📂assets
 ┃ ┣ 📂fonts
 ┃ ┃ ┣ 📜GmarketSansTTFBold.ttf
 ┃ ┃ ┣ 📜GmarketSansTTFLight.ttf
 ┃ ┃ ┣ 📜GmarketSansTTFMedium.ttf
 ┃ ┃ ┗ 📜Yeongdeok Sea.ttf
 ┃ ┣ 📂images
 ┃ ┃ ┣ 📂article
 ┃ ┃ ┃ ┣ 📜comment_delete_icon.png
 ┃ ┃ ┃ ┣ 📜comment_icon.png
 ┃ ┃ ┃ ┣ 📜comment_submit_icon.png
 ┃ ┃ ┃ ┣ 📜delete_button.png
 ┃ ┃ ┃ ┣ 📜edit_button.png
 ┃ ┃ ┃ ┣ 📜heart_active.png
 ┃ ┃ ┃ ┣ 📜like_button.png
 ┃ ┃ ┃ ┣ 📜search_bar.png
 ┃ ┃ ┃ ┣ 📜type1_active.png
 ┃ ┃ ┃ ┣ 📜type1_inactive.png
 ┃ ┃ ┃ ┣ 📜type2_active.png
 ┃ ┃ ┃ ┣ 📜type2_inactive.png
 ┃ ┃ ┃ ┣ 📜type3_active.png
 ┃ ┃ ┃ ┣ 📜type3_inactive.png
 ┃ ┃ ┃ ┣ 📜type4_active.png
 ┃ ┃ ┃ ┣ 📜type4_inactive.png
 ┃ ┃ ┃ ┣ 📜type5_active.png
 ┃ ┃ ┃ ┣ 📜type5_inactive.png
 ┃ ┃ ┃ ┣ 📜typeAll_active.png
 ┃ ┃ ┃ ┗ 📜typeAll_inactive.png
 ┃ ┃ ┣ 📂icon
 ┃ ┃ ┃ ┣ 📜icon_comment.png
 ┃ ┃ ┃ ┣ 📜icon_delete.png
 ┃ ┃ ┃ ┣ 📜icon_email.png
 ┃ ┃ ┃ ┣ 📜icon_fire.png
 ┃ ┃ ┃ ┣ 📜icon_heart.png
 ┃ ┃ ┃ ┣ 📜icon_introduce.png
 ┃ ┃ ┃ ┣ 📜icon_list.png
 ┃ ┃ ┃ ┣ 📜icon_menu.png
 ┃ ┃ ┃ ┣ 📜icon_setting.png
 ┃ ┃ ┃ ┣ 📜icon_siren.png
 ┃ ┃ ┃ ┗ 📜icon_sns.png
 ┃ ┃ ┣ 📂mailbox
 ┃ ┃ ┃ ┣ 📜mailbox_01.png
 ┃ ┃ ┃ ┣ 📜mailbox_02.png
 ┃ ┃ ┃ ┣ 📜mailbox_03.png
 ┃ ┃ ┃ ┣ 📜mailbox_04.png
 ┃ ┃ ┃ ┣ 📜mailbox_05.png
 ┃ ┃ ┃ ┣ 📜mailbox_with_notification_01.png
 ┃ ┃ ┃ ┣ 📜mailbox_with_notification_02.png
 ┃ ┃ ┃ ┣ 📜mailbox_with_notification_03.png
 ┃ ┃ ┃ ┣ 📜mailbox_with_notification_04.png
 ┃ ┃ ┃ ┗ 📜mailbox_with_notification_05.png
 ┃ ┃ ┣ 📂navbar
 ┃ ┃ ┃ ┣ 📜community_icon_active.png
 ┃ ┃ ┃ ┣ 📜community_icon_inactive.png
 ┃ ┃ ┃ ┣ 📜home_icon_active.png
 ┃ ┃ ┃ ┣ 📜home_icon_inactive.png
 ┃ ┃ ┃ ┣ 📜mailbox_icon_active.png
 ┃ ┃ ┃ ┣ 📜mailbox_icon_inactive.png
 ┃ ┃ ┃ ┣ 📜mypage_icon_active.png
 ┃ ┃ ┃ ┗ 📜mypage_icon_inactive.png
 ┃ ┃ ┣ 📜background_sea.png
 ┃ ┃ ┣ 📜button_check.png
 ┃ ┃ ┣ 📜default_thumbnail.png
 ┃ ┃ ┣ 📜dropdown_arrow_down.png
 ┃ ┃ ┣ 📜dropdown_arrow_up.png
 ┃ ┃ ┣ 📜go_back_arrow.png
 ┃ ┃ ┣ 📜img_login.png
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜logo.png
 ┃ ┃ ┗ 📜picture_button.png
 ┃ ┗ 📜Strings.js
 ┣ 📂components
 ┃ ┣ 📂article
 ┃ ┃ ┣ 📜ArticleForm.js
 ┃ ┃ ┗ 📜ArticleList.js
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📜ConfirmModal.js
 ┃ ┃ ┣ 📜Header.jsx
 ┃ ┃ ┣ 📜Navbar.js
 ┃ ┃ ┗ 📜XModal.js
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📜LayoutWithHeaderAndNav.jsx
 ┃ ┃ ┗ 📜LayoutWithNav.jsx
 ┃ ┣ 📂login
 ┃ ┃ ┗ 📜LoginForm.jsx
 ┃ ┣ 📂mailbox
 ┃ ┃ ┣ 📜MailList.jsx
 ┃ ┃ ┗ 📜MoveToMailWriteButton.jsx
 ┃ ┣ 📂mailboxList
 ┃ ┃ ┗ 📜MailboxList.jsx
 ┃ ┣ 📂mailWrite
 ┃ ┃ ┗ 📜MailWriteForm.jsx
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📜AttendanceButton.jsx
 ┃ ┃ ┣ 📜NoticeList.jsx
 ┃ ┃ ┣ 📜PopularArticleList.jsx
 ┃ ┃ ┗ 📜TardyList.jsx
 ┃ ┣ 📂profile
 ┃ ┃ ┣ 📜Profile.jsx
 ┃ ┃ ┗ 📜ProfileArticleList.jsx
 ┃ ┗ 📂profileEdit
 ┃ ┃ ┗ 📜ProfileForm.jsx
 ┣ 📂pages
 ┃ ┣ 📜ArticleBoardPage.js
 ┃ ┣ 📜ArticleDetailPage.js
 ┃ ┣ 📜ArticleEditPage.js
 ┃ ┣ 📜ArticleWritePage.js
 ┃ ┣ 📜LoginPage.jsx
 ┃ ┣ 📜MailboxListPage.jsx
 ┃ ┣ 📜MailboxPage.jsx
 ┃ ┣ 📜MailWritePage.jsx
 ┃ ┣ 📜MainPage.jsx
 ┃ ┣ 📜NotFoundPage.jsx
 ┃ ┣ 📜ProfileEditPage.jsx
 ┃ ┗ 📜ProfilePage.jsx
 ┣ 📂recoil
 ┃ ┗ 📜atom.js
 ┣ 📂router
 ┃ ┣ 📜AppRouter.jsx
 ┃ ┣ 📜ProtectedRoute.jsx
 ┃ ┣ 📜PublicRoute.jsx
 ┃ ┗ 📜Routes.js
 ┣ 📂styles
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂article
 ┃ ┃ ┃ ┣ 📜ArticleForm.css
 ┃ ┃ ┃ ┗ 📜ArticleList.css
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┣ 📜ConfirmModal.css
 ┃ ┃ ┃ ┣ 📜Header.module.css
 ┃ ┃ ┃ ┣ 📜Navbar.css
 ┃ ┃ ┃ ┗ 📜XModal.css
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┗ 📜LoginForm.module.css
 ┃ ┃ ┣ 📂mailbox
 ┃ ┃ ┃ ┣ 📜MailList.module.css
 ┃ ┃ ┃ ┗ 📜MoveToMailWriteButton.module.css
 ┃ ┃ ┣ 📂mailboxList
 ┃ ┃ ┃ ┗ 📜MailboxList.module.css
 ┃ ┃ ┣ 📂mailWrite
 ┃ ┃ ┃ ┗ 📜MailWriteForm.module.css
 ┃ ┃ ┣ 📂main
 ┃ ┃ ┃ ┣ 📜AttendanceButton.module.css
 ┃ ┃ ┃ ┣ 📜NoticeList.module.css
 ┃ ┃ ┃ ┣ 📜PopularArticleList.module.css
 ┃ ┃ ┃ ┗ 📜TardyList.module.css
 ┃ ┃ ┣ 📂profile
 ┃ ┃ ┃ ┣ 📜Profile.module.css
 ┃ ┃ ┃ ┗ 📜ProfileArticleList.module.css
 ┃ ┃ ┗ 📂profileEdit
 ┃ ┃ ┃ ┗ 📜ProfileForm.module.css
 ┃ ┗ 📂pages
 ┃ ┃ ┣ 📜ArticleBoardPage.css
 ┃ ┃ ┣ 📜ArticleDetailPage.css
 ┃ ┃ ┣ 📜LoginPage.module.css
 ┃ ┃ ┣ 📜MailboxListPage.module.css
 ┃ ┃ ┣ 📜MailboxPage.module.css
 ┃ ┃ ┣ 📜MailWritePage.module.css
 ┃ ┃ ┣ 📜MainPage.module.css
 ┃ ┃ ┣ 📜ProfileEditPage.module.css
 ┃ ┃ ┗ 📜ProfilePage.module.css
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜App.test.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┣ 📜reportWebVitals.js
 ┗ 📜setupTests.js
```
