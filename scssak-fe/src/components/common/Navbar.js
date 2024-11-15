import React from 'react';
import {useNavigate} from 'react-router-dom';
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
  mailboxListRoute,
  profileRootRoute,
} from '../../router/Routes';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-item" onClick={() => navigate(mainRoute)}>
        <img src={homeIconActive} alt="Home" className="active" />
      </div>
      <div className="nav-item" onClick={() => navigate(boardRoute)}>
        <img src={communityIconActive} alt="Community" />
      </div>
      <div className="nav-item" onClick={() => navigate(mailboxListRoute)}>
        <img src={mailboxIconActive} alt="Mailbox" />
      </div>
      <div className="nav-item" onClick={() => navigate(profileRootRoute)}>
        <img src={mypageIconActive} alt="My" />
      </div>
    </nav>
  );
};

export default Navbar;
