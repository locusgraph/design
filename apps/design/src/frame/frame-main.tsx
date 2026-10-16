import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../globals.css";
import { FrameApp } from "./frame-app";
import { FrameShell } from "./frame-shell";

const frameParams = new URLSearchParams(window.location.search);
const shellId = frameParams.get("shell");
const shellTheme = frameParams.get("theme") === "dark" ? "dark" : "light";

if (shellId && frameParams.get("outline") === "1") {
  document.documentElement.dataset.shellOutline = "";
}

if (!shellId) {
  document.documentElement.style.overflow = "hidden";
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      {shellId ? <FrameShell id={shellId} theme={shellTheme} /> : <FrameApp />}
    </StrictMode>
  );
}
