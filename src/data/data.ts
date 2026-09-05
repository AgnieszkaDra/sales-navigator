import menu from "./menu";
import type { MenuData } from "../types/navbar";

export interface Data {
  menu: MenuData;
}

export const data: Data = {
  menu,
};

export default data;