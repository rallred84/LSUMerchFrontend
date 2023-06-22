// This is the main landing page for the app.

import { Outlet } from 'react-router-dom';
import Header from '../components/header';
import Nav from '../components/nav';

//All Global state to be saved in this file and then exported to other components via Outlet Context

const Root = () => {
  return (
    <>
      <Header />
      <Nav />
      <div id="main">
        <Outlet context={{}} />
      </div>
    </>
  );
};

export default Root;
