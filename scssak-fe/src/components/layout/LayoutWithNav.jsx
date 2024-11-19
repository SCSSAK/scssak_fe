import {Outlet} from 'react-router-dom';

import Navbar from '../common/Navbar';

export default function LayoutWithNav() {
  return (
    <>
      <main id="main-with-nav">
        <Outlet />
      </main>
      <Navbar />
    </>
  );
}
