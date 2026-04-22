import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactLenis
      root
      options={{
        smoothWheel: true,
        lerp: 0.04,
        syncTouch: true,
        smoothTouch: true,
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactLenis>
  </StrictMode>,
);
