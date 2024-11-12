import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {loginRoute, mainRoute, mailboxListRoute} from './Routes';

import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import MailboxListPage from '../pages/MailboxListPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={loginRoute} element={<LoginPage />} />
        <Route path={mainRoute} element={<MainPage />} />
        <Route path={mailboxListRoute} element={<MailboxListPage />} />
      </Routes>
    </BrowserRouter>
  );
}
