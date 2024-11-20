import {useNavigate, useLocation} from 'react-router-dom';
import '../../styles/components/common/Navbar.css'; // 네비게이션 바 CSS
import communityIconActive from '../../assets/images/navbar/community_icon_active.png';
// import communityIconInactive from '../../assets/images/navbar/community_icon_inactive.png';
import homeIconActive from '../../assets/images/navbar/home_icon_active.png';
// import homeIconInactive from '../../assets/images/navbar/home_icon_inactive.png';
import mailboxIconActive from '../../assets/images/navbar/mailbox_icon_active.png';
// import mailboxIconInactive from '../../assets/images/navbar/mailbox_icon_inactive.png';
import mypageIconActive from '../../assets/images/navbar/mypage_icon_active.png';
// import mypageIconInactive from '../../assets/images/navbar/mypage_icon_inactive.png';

import {
  mainRoute,
  boardRoute,
  mailboxRootRoute,
  profileRootRoute,
} from '../../router/Routes';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const loginedUserId = localStorage.getItem('userId');

  const menuList = [
    {to: '/main', alt: 'Home', src: homeIconActive, route: mainRoute},
    {
      to: '/board',
      alt: 'Community',
      src: communityIconActive,
      route: boardRoute,
    },
    {
      to: '/mailbox',
      alt: 'Mailbox',
      src: mailboxIconActive,
      route: mailboxRootRoute,
    },
    {
      to: '/profile',
      alt: 'My',
      src: mypageIconActive,
      route: profileRootRoute + '/' + loginedUserId,
    },
  ];

  return (
    <nav className="navbar">
      {menuList.map((menu, idx) => (
        <div
          key={idx}
          className="nav-item"
          onClick={() => navigate(menu.route)}>
          <img
            src={menu.src}
            alt={menu.alt}
            className={location.pathname.startsWith(menu.to) ? 'active' : ''}
          />
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
