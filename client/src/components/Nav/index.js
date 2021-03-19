import styles from "./Nav.module.scss";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className={styles.nav}>
      <NavLink to='/'>Alphasense Coding Challenge</NavLink>
    </div>
  );
};

export default Nav;
