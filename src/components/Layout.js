import { Helmet } from 'react-helmet';
import Navbar from './Navbar';
import Splash from './Splash';
import Search from './Search';
import React, { useState, useEffect } from 'react';

const Layout = ({ children, pageTitle }) => {
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');

  useEffect(() => {
    // Simulate a loading delay with setTimeout
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Clear the timeout to avoid memory leaks when the component unmounts
    return () => clearTimeout(timeout);
  }, [loading]);

  const handleHomeClick = () => {
    // Trigger the refresh or any action you want when the home link is clicked
    setLoading(true);
  };

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      {loading ? <Splash /> : <>
        <Navbar onHomeClick={handleHomeClick} search={search} setSearch={setSearch} />
        <main>
          {search ? <Search data={search}/> : 
          <>
            {children}
          </>
          }
        </main>
      </>}
    </div>
  );
};

export default Layout;