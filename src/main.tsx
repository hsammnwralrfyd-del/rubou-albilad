
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Restore the requested route when returning from GitHub Pages 404.html
const params = new URLSearchParams(window.location.search);
const savedPath = params.get("p");

if (savedPath) {
  const query = params.get("q");
  const targetPath =
    "/rubou-albilad" +
    (savedPath.startsWith("/") ? savedPath : "/" + savedPath) +
    (query ? "?" + query : "") +
    window.location.hash;

  window.history.replaceState(null, "", targetPath);
}

createRoot(document.getElementById("root")!).render(<App />);
