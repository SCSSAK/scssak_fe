import {useEffect} from 'react';
import {useNavigate, Outlet} from 'react-router-dom';

export default function PublicRoute() {
  const isAuthenticated = localStorage.getItem('access_token') !== null;
  const navigate = useNavigate();

  useEffect(() => {
    // 이미 로그인한 경우 이전 페이지로 돌아감
    if (isAuthenticated) {
      navigate(-1);
    }
  }, []);

  return <Outlet />;
}
