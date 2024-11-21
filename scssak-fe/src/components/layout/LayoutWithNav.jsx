import {Outlet} from 'react-router-dom';

import Navbar from '../common/Navbar';

export default function LayoutWithNav({children}) {
  return (
    <>
      <main id="main-with-nav">
        <Outlet />
        {children}
      </main>
      <Navbar />
    </>
  );
}
