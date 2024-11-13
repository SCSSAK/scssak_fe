import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {
  loginRoute,
  mainRoute,
  boardRoute,
  writeRoute,
  editRoute,
  mailboxListRoute,
  mailboxRoute,
  mailWriteRoute,
} from './Routes';

import LoginPage from '../pages/LoginPage';
import ArticleBoardPage from '../pages/ArticleBoardPage';
import ArticleWritePage from '../pages/ArticleWritePage';
import ArticleEditPage from '../pages/ArticleEditPage';
import MainPage from '../pages/MainPage';
import MailboxListPage from '../pages/MailboxListPage';
import MailboxPage from '../pages/MailboxPage';
import MailWritePage from '../pages/MailWritePage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={loginRoute} element={<LoginPage />} />
        <Route path={boardRoute} element={<ArticleBoardPage />} />
        <Route path={writeRoute} element={<ArticleWritePage />} />
        <Route path={editRoute} element={<ArticleEditPage />} />
        <Route path={mainRoute} element={<MainPage />} />
        <Route path={mailboxListRoute} element={<MailboxListPage />} />
        <Route path={mailboxRoute} element={<MailboxPage />} />
        <Route path={mailWriteRoute} element={<MailWritePage />} />
      </Routes>
    </BrowserRouter>
  );
}
