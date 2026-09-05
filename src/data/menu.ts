import type { MenuData, MenuLink, MenuRoot } from "../types/navbar";

const items: Record<number, MenuLink> = {
  1: {
    id: 1,
    label: "Znajdź mieszkanie",
    path: "Znajdź mieszkanie",
    className: "border-1 border-all-solid border-orangeBrown menu__item--find",
  },
  2: {
    id: 2,
    label: "Home",
    path: "Home",
  },
  3: {
    id: 3,
    label: "Galeria",
    path: "Galeria",
  },
  4: {
    id: 4,
    label: "Napisz do nas",
    path: "Napisz do nas",
    className: "menu__link--contact-form padding-2",
  },
};

const itemsMobile: Record<number, MenuLink> = {
  1: {
    id: 1,
    label: "Home",
    path: "Home",
  },
  2: {
    id: 2,
    label: "Mieszkania",
    path: "Mieszkania",
    className: "border-1 border-all-solid border-orangeBrown menu__item--find",
  },
  
  3: {
    id: 3,
    label: "Galeria",
    path: "Galeria",
  },
  4: {
    id: 4,
    label: "Kontakt",
    path: "Kontakt",
    className: "menu__link--contact-form padding-2",
  },
};

const createMenu = (
  menuItems: Record<number, MenuLink>
): MenuData => {
  const root: MenuRoot = {
    id: 0,
    name: "(Root)",
    label: "Menu",
    childIds: Object.keys(menuItems).map(Number),
  };

  return {
    menu: menuItems,
    menuItem: root,
  };
};

export const menu = createMenu(items);
export const menuMobile = createMenu(itemsMobile);

export default menu;