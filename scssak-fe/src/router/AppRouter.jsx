import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {loginRoute, mainRoute, boardRoute, writeRoute} from './Routes';

import LoginPage from '../pages/LoginPage';
import ArticleBoardPage from '../pages/ArticleBoardPage';
import ArticleWritePage from '../pages/ArticleWritePage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={loginRoute} element={<LoginPage />} />
        <Route path={boardRoute} element={<ArticleBoardPage />} />
        <Route path={writeRoute} element={<ArticleWritePage />} />
      </Routes>
    </BrowserRouter>
  );
}
