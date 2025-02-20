import { ProjectSettings } from "~/lib/projectSettings/types";

export const createCustomCode = (code: ProjectSettings["code"]) => {
  const { customCss, codeInjectionFooter, codeInjectionHeader } = code || {};

  // Handle custom CSS
  if (customCss) {
    let style = document.getElementById("custom-css") as HTMLStyleElement | null;

    if (!style) {
      style = document.createElement("style");
      style.id = "custom-css";
      document.head.appendChild(style);
    }

    // Update only if different
    if (style.innerHTML !== customCss) {
      style.innerHTML = customCss;
    }
  }

  // Handle Header Injection
  if (codeInjectionHeader) {
    let header = document.getElementById("custom-header");

    if (!header) {
      header = document.createElement("div");
      header.id = "custom-header";
      header.innerHTML = codeInjectionHeader;
      document.body.prepend(header);
    }
  }

  // Handle Footer Injection
  if (codeInjectionFooter) {
    let footer = document.getElementById("custom-footer");

    if (!footer) {
      footer = document.createElement("div");
      footer.id = "custom-footer";
      footer.innerHTML = codeInjectionFooter;
      document.body.appendChild(footer);
    }
  }
};
