import { Link } from "react-router-dom";
import styles from "../css/nav.module.css";
import { useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();

  return (
    <nav>
      <div className={styles.logoContainer}>
        <Link
          to={"/"}
          className={location.pathname === "/" ? styles.active : ""}
        >
          Home
        </Link>
      </div>
      <div className={styles.menuContainer}>
        <Link
          to={"/board?page=1"}
          className={location.pathname === "/board" ? styles.active : ""}
        >
          Board
        </Link>
        <Link
          to={"/about"}
          className={location.pathname === "/about" ? styles.active : ""}
        >
          About
        </Link>
        <Link
          to={"/login"}
          className={location.pathname === "/login" ? styles.active : ""}
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
