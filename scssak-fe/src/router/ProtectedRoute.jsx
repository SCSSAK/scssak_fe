import {useEffect} from 'react';
import {Navigate, useLocation, Outlet} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import {xModalAtom} from '../recoil/atom';

import {loginRoute} from './Routes';

export default function ProtectedRoute() {
  // 에러 메시지 전역 상태
  const setXModalState = useSetRecoilState(xModalAtom);

  const isAuthenticated = localStorage.getItem('access_token') !== null;
  const location = useLocation();

  useEffect(() => {
    // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    // state를 통해 이전 위치 정보를 전달하여 로그인 후 원래 가려던 페이지로 이동
    if (!isAuthenticated && location.state) {
      setXModalState({
        isOpened: true,
        message: '로그인이 필요합니다.',
      });
    }
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={loginRoute} state={{from: location}} replace />;
  }
  return <Outlet />;
}
