import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/common/Navbar.css'; // 네비게이션 바 CSS

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-item" onClick={() => navigate('/home')}>
        <img src="/icons/home.png" alt="Home" />
        <span>홈</span>
      </div>
      <div className="nav-item" onClick={() => navigate('/community')}>
        <img src="/icons/community.png" alt="Community" />
        <span>커뮤니티</span>
      </div>
      <div className="nav-item" onClick={() => navigate('/mailbox')}>
        <img src="/icons/mailbox.png" alt="Mailbox" />
        <span>우체통</span>
      </div>
      <div className="nav-item" onClick={() => navigate('/my')}>
        <img src="/icons/my.png" alt="My" />
        <span>마이</span>
      </div>
    </nav>
  );
};

export default Navbar;
