import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hamburger, Logo, Menu } from '../ui';
import "../styles/header.scss"

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen((prev) => {
      const next = !prev;
      if (next) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return next;
    });
  };

  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* MOBILE MENU */}
      <motion.div
        className="header__mobile page-width"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Hamburger navbarOpen={navbarOpen} toggleNavbar={toggleNavbar} />
      </motion.div>

      {/* NAV */}
      <motion.nav
  className="nav"
  initial={false}
  animate={{
    y: navbarOpen ? 0 : '-100%',
  }}
  transition={{
    duration: 1.2,
    ease: [0.76, 0, 0.24, 1],
  }}
>
  <Menu
    slots={{
      center: <Logo />,
    }}
  />
</motion.nav>
    </motion.header>
  );
};

export default Header;