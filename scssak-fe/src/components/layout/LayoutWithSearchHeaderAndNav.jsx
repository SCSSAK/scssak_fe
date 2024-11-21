import {Outlet} from 'react-router-dom';

import Header from '../common/Header';
import Navbar from '../common/Navbar';

export default function LayoutWithSearchHeaderAndNav() {
  return (
    <>
      <Header hasSearchBar={true} />
      <main id="main-with-header-and-nav">
        <Outlet />
      </main>
      <Navbar />
    </>
  );
}
