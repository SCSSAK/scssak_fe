import LayoutWithHeaderAndNav from '../components/layout/LayoutWithHeaderAndNav';
import LayoutWithNav from '../components/layout/LayoutWithNav';

import StudentMainPage from '../pages/StudentMainPage';
import GraduateMainPage from '../pages/GraduateMainPage';

export default function MainRoute() {
  const isStudent = localStorage.getItem('user_is_student') === 'true';

  return isStudent ? (
    <LayoutWithHeaderAndNav children={<StudentMainPage />} />
  ) : (
    <LayoutWithNav children={<GraduateMainPage />} />
  );
}
