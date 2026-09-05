import type { JSX, ReactNode } from "react";
import type { MenuData } from "../types/navbar";

import useMediaQuery from "../hooks/useMediaQuery";
import { menu, menuMobile } from "../data/menu";

type MenuItemProps = {
  id: number;
  menu: MenuData["menu"];
};

type MenuSlots = {
  start?: ReactNode;
  center?: ReactNode;
  end?: ReactNode;
};

type MenuProps = {
  slots?: MenuSlots;
};

const MenuItemComponent = ({
  id,
  menu,
}: MenuItemProps): JSX.Element | null => {
  const item = menu[id];

  if (!item) return null;

  return (
    <li
      className={`menu__item ${item.className ?? ""}`}
      role="none"
    >
      <a
        href={`#${item.path}`}
        className="menu__link text"
        role="menuitem"
      >
        <span>{item.label}</span>
      </a>
    </li>
  );
};

const Menu = ({ slots }: MenuProps): JSX.Element => {
  const isMobile = useMediaQuery("(max-width: 48rem)");

  const currentMenu = isMobile ? menuMobile : menu;
  const rootChildren = currentMenu.menuItem.childIds ?? [];

  const middle = Math.ceil(rootChildren.length / 2);

  return (
    <ul
      className="menu"
      role="menu"
      aria-label="Main menu"
    >
      {slots?.start && (
        <li className="menu__slot menu__slot--start">
          {slots.start}
        </li>
      )}

      {rootChildren.slice(0, middle).map((id) => (
        <MenuItemComponent
          key={id}
          id={id}
          menu={currentMenu.menu}
        />
      ))}

      {slots?.center && (
        <li className="menu__slot menu__slot--center">
          {slots.center}
        </li>
      )}

      {rootChildren.slice(middle).map((id) => (
        <MenuItemComponent
          key={id}
          id={id}
          menu={currentMenu.menu}
        />
      ))}

      {slots?.end && (
        <li className="menu__slot menu__slot--end">
          {slots.end}
        </li>
      )}
    </ul>
  );
};

export default Menu;