import React from 'react';
import Header from '../Header/Header';
import Routers from '../../router/Routers';
import Footer from '../Footer/Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <Routers /> {/* All page-level content comes through here */}
      <Footer />
    </>
  );
};

export default Layout;
