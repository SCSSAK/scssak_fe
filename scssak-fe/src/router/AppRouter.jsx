import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {
  loginRoute,
  mainRoute,
  boardRoute,
  articleWriteRoute,
  articleEditRoute,
  mailboxRootRoute,
  mailboxRoute,
  mailWriteRoute,
  profileRoute,
  profileEditRoute,
} from './Routes';

import LoginPage from '../pages/LoginPage';
import ArticleBoardPage from '../pages/ArticleBoardPage';
import ArticleWritePage from '../pages/ArticleWritePage';
import ArticleEditPage from '../pages/ArticleEditPage';
import ArticleDetailPage from '../pages/ArticleDetailPage';
import MainPage from '../pages/MainPage';
import MailboxListPage from '../pages/MailboxListPage';
import MailboxPage from '../pages/MailboxPage';
import MailWritePage from '../pages/MailWritePage';
import ProfilePage from '../pages/ProfilePage';
import ProfileEditPage from '../pages/ProfileEditPage';

import LayoutWithHeaderAndNav from '../components/layout/LayoutWithHeaderAndNav';
import LayoutWithNav from '../components/layout/LayoutWithNav';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* logo header, bottom nav 모두 있는 경우 */}
        <Route element={<LayoutWithHeaderAndNav />}>
          <Route path={boardRoute} element={<ArticleBoardPage />} />

          <Route path={mainRoute} element={<MainPage />} />

          <Route path={mailboxRootRoute} element={<MailboxListPage />} />
          <Route path={mailboxRoute} element={<MailboxPage />} />
          <Route path={profileRoute} element={<ProfilePage />} />
        </Route>

        {/* bottom nav만 있는 경우 */}
        <Route element={<LayoutWithNav />}>
          <Route
            path={boardRoute + '/:article_id'}
            element={<ArticleDetailPage />}></Route>

          <Route path={mailWriteRoute} element={<MailWritePage />} />
          <Route path={profileEditRoute} element={<ProfileEditPage />} />
        </Route>

        {/* 둘 다 없는 경우 */}
        <Route path={loginRoute} element={<LoginPage />} />
        <Route path={articleWriteRoute} element={<ArticleWritePage />} />
        <Route
          path={articleEditRoute + '/:articleId'}
          element={<ArticleEditPage />}
        />
        <Route
          path={boardRoute + '/:articleId'}
          element={<ArticleDetailPage />}></Route>
        <Route path={mainRoute} element={<MainPage />} />
        <Route path={mailboxRootRoute} element={<MailboxListPage />} />
        <Route path={mailboxRoute} element={<MailboxPage />} />
        <Route path={mailWriteRoute} element={<MailWritePage />} />
        <Route path={profileRoute} element={<ProfilePage />} />
        <Route path={profileEditRoute} element={<ProfileEditPage />} />
        <Route path={articleEditRoute} element={<ArticleEditPage />} />
      </Routes>
    </BrowserRouter>
  );
}
