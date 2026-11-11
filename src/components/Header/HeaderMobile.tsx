import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Hamburger, Menu, Logo } from '../../ui';

const HeaderMobile = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = navbarOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [navbarOpen]);

  const toggleNavbar = () => {
    setNavbarOpen((prev) => !prev);
  };

  return (
     <>
      <motion.div
         className={`
            header__mobile
            page-width
            ${navbarOpen ? 'header__mobile--open' : ''}
          `}
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          delay: 0.3,
          duration: 0.5,
        }}
      >
        <Hamburger
          navbarOpen={navbarOpen}
          toggleNavbar={toggleNavbar}
        />
      </motion.div>

      <motion.nav
        className="
        nav 
        nav--mobile
        background-black
        text-white
        "
        initial={false}
        animate={{
          y: navbarOpen ? '0%' : 'calc(-100% - 60px)',
        }}
        transition={{
          duration: 1.2,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{
          pointerEvents: navbarOpen ? 'auto' : 'none',
        }}
      >
        <Menu
          slots={{
            center: <Logo />,
          }}
        />
      </motion.nav>
    </>
  );
};

export default HeaderMobile;

