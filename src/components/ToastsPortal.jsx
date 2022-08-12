import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const portal = document.getElementById("portal");

function ToastsPortal({ children }) {
  const containerRef = useRef(null);

  if (!containerRef.current) {
    containerRef.current = document.createElement("div");
  }

  useEffect(() => {
    portal.appendChild(containerRef.current);

    return () => portal.removeChild(containerRef.current);
  }, []);

  return createPortal(children, containerRef.current);
}

export default ToastsPortal;
