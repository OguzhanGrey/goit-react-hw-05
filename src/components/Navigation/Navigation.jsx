import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className={css.nav}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${css.linkHome} ${css.active}` : css.linkHome
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) =>
          isActive ? `${css.linkHome} ${css.active}` : css.linkHome
        }
      >
        Movies
      </NavLink>
    </nav>
  );
}

export default Navigation;
