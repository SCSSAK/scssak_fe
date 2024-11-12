import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {loginRoute, mainRoute} from './Routes';

import LoginPage from '../pages/LoginPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={loginRoute} element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
