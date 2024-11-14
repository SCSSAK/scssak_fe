import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {
  loginRoute,
  mainRoute,
  boardRoute,
  articleWriteRoute,
  articleEditRoute,
  mailboxListRoute,
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

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={loginRoute} element={<LoginPage />} />
        <Route path={boardRoute} element={<ArticleBoardPage />} />
        <Route path={articleWriteRoute} element={<ArticleWritePage />} />
        <Route path={articleEditRoute} element={<ArticleEditPage />} />
        <Route
          path={boardRoute + '/:article_id'}
          element={<ArticleDetailPage />}></Route>
        <Route path={mainRoute} element={<MainPage />} />
        <Route path={mailboxListRoute} element={<MailboxListPage />} />
        <Route path={mailboxRoute} element={<MailboxPage />} />
        <Route path={mailWriteRoute} element={<MailWritePage />} />
        <Route path={profileRoute} element={<ProfilePage />} />
        <Route path={profileEditRoute} element={<ProfileEditPage />} />
      </Routes>
    </BrowserRouter>
  );
}
