import { motion } from 'framer-motion';
import { Menu, Logo } from '../../ui';

const Header = () => {
  return (
    <motion.header
      className="
        header 
        text-white 
        background-black
      "
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
      }}
    >
      <nav className="nav">
        <Menu
          slots={{
            center: <Logo />,
          }}
        />
      </nav>
    </motion.header>
  );
};

export default Header;