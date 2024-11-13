import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {
  loginRoute,
  mainRoute,
  boardRoute,
  writeRoute,
  editRoute,
} from './Routes';

import LoginPage from '../pages/LoginPage';
import ArticleBoardPage from '../pages/ArticleBoardPage';
import ArticleWritePage from '../pages/ArticleWritePage';
import ArticleEditPage from '../pages/ArticleEditPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={loginRoute} element={<LoginPage />} />
        <Route path={boardRoute} element={<ArticleBoardPage />} />
        <Route path={writeRoute} element={<ArticleWritePage />} />
        <Route path={editRoute} element={<ArticleEditPage />} />
      </Routes>
    </BrowserRouter>
  );
}
