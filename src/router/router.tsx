import {createRoot,  type Root } from "react-dom/client";
import ApartmentPage from "../components/ApartmentPage/ApartmentPage";
import { NotFoundPage } from "../pages/index";
import type { ComponentType } from "react";

let root: Root | null = null;

type Route = {
  path: string;
  page?: () => string;
  component?: ComponentType<{ oferta: string }>;
  param?: string;
  params?: { [key: string]: string };
};

const routes: Route[] = [
  { path: "/oferta/:oferta", component: ApartmentPage },
];

function matchRoute(path: string): { route: Route, param?: string } | undefined {
  for (const route of routes) {
    if (!route.path.includes(":")) {
      if (route.path === path) return { route };
    } else {
      const pattern = route.path.replace(/:(\w+)/g, "([^/]+)");
      const regex = new RegExp(`^${pattern}$`);
      const match = path.match(regex);

      if (match) {
       return { route, param: match[1] };
      }
    }
  }
  return undefined;
}

export async function navigate(path: string) {
  const container = document.getElementById("root");
  if (!container) return;

  if (!root) {
    root = createRoot(container);
  }

  const matched = matchRoute(path);

  if (!matched) {
    root.render(<NotFoundPage />);
    return;
  }

  const { route, param } = matched;

  try {
    const Component = route.component;

    if (!Component) {
      root.render(<NotFoundPage />);
      return;
    }

    root.render(<Component oferta={param ?? ""} />);

    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("locationChange"));
  } catch (error) {
    console.error("Error loading component:", error);
    root.render(<NotFoundPage />);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  navigate(window.location.pathname);
});






