import {useEffect} from 'react';
import {useNavigate, Outlet, useLocation} from 'react-router-dom';

import {mainRoute} from './Routes';

export default function PublicRoute() {
  const isAuthenticated = localStorage.getItem('access_token') !== null;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 이미 로그인한 경우 이전 페이지로 돌아감
    if (isAuthenticated) {
      if (location.state) {
        navigate(-1);
      } else {
        navigate(mainRoute);
      }
    }
  }, []);

  if (!isAuthenticated) {
    return <Outlet />;
  }
}
