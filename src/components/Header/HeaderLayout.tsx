import { useEffect, useState } from 'react';
import Header from './Header';
import HeaderMobile from './HeaderMobile';
import './header.scss';

const HeaderLayout = () => {
const [isDesktop, setIsDesktop] = useState(() =>
  window.matchMedia('(min-width: 64rem)').matches
);

useEffect(() => {
  const mediaQuery = window.matchMedia('(min-width: 64rem)');

  const handleResize = (event: MediaQueryListEvent) => {
    setIsDesktop(event.matches);
  };

  mediaQuery.addEventListener('change', handleResize);

  return () => {
    mediaQuery.removeEventListener('change', handleResize);
  };

}, []);

return (
  <>
  {isDesktop ? <Header /> : <HeaderMobile />}
  </>
);
};

export default HeaderLayout;