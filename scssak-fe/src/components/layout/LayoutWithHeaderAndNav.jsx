import {Outlet} from 'react-router-dom';

import Header from '../common/Header';
import Navbar from '../common/Navbar';

export default function LayoutWithHeaderAndNav() {
  return (
    <>
      <Header />
      <main id="main-with-header-and-nav">
        <Outlet />
      </main>
      <Navbar />
    </>
  );
}
