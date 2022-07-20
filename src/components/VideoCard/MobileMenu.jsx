import { useEffect } from "react";

import "./VideoCard.css";

const MobileMenu = ({ showMenu, setShowMenu, children }) => {
  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = "unset");
    }
  }, [showMenu]);

  return (
    <article
      className="vcard__menu"
      style={{ visibility: showMenu ? "visible" : "hidden" }}
    >
      <section className="vcard__menu__content">
        {children}
        <button
          className="vcard__menu__btn--cancel"
          onClick={() => {
            setShowMenu((prevState) => !prevState);
          }}
        >
          <span className="vcard__menu__btn--text">Cancel</span>
        </button>
      </section>
    </article>
  );
};

export { MobileMenu };
