// export type HamburgerProps = {
//   navbarOpen: boolean;
//   toggleNavbar: () => void;
// }

// export type NavigationLinkProps = {
//   value: string;
//   to: string;
//   className?: string;
// };

// export interface MenuItem {
//   id: number;
//   label?: string;
//   path?: string;
//   name?: string;
//   childIds?: number[];
// }

// export interface MenuData {
//   menu: Record<number, MenuItem>
//   menuItem: MenuItem;
// }

// export type MenuProps = {
//   isOpen: boolean;
// };

export type HamburgerProps = {
  navbarOpen: boolean;
  toggleNavbar: () => void;
};

export type NavigationLinkProps = {
  value: string;
  to: string;
  className?: string;
};

export interface MenuLink {
  id: number;
  label: string;
  path: string;
  className?: string;
}

export interface MenuRoot {
  id: number;
  name: string;
  label: string;
  childIds: number[];
}

export interface MenuData {
  menu: Record<number, MenuLink>;
  menuItem: MenuRoot;
}

export type MenuProps = {
  isOpen: boolean;
};