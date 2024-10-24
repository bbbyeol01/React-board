import { Link } from "react-router-dom";
import styles from "../css/nav.module.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import useMemberStore from "../../src/store";

export default function Nav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { nickname, profile_image } = useMemberStore();
  const [menuOpen, setMenuOpen] = useState(false); // 메뉴 열림 상태

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // 클릭 시 메뉴 열림/닫힘 상태 토글
  };

  // 유저 정보 불러오기
  // useEffect(() => {
  //   const accessToken = cookies.accessToken; // 'token'이라는 이름의 쿠키 값을 가져옵니다.

  //   getMember(accessToken);
  // }, []);

  return (
    <nav>
      <div className={styles.hamburgerMenu} onClick={toggleMenu}>
        <svg
          clip-rule="evenodd"
          fill-rule="evenodd"
          stroke-linejoin="round"
          stroke-miterlimit="2"
          viewBox="0 0 24 24"
          width={35}
          height={35}
          fill={"white"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m22 16.75c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75z"
            fill-rule="nonzero"
          />
        </svg>

        {nickname ? (
          <>
            <div className={styles.profileContainer}>
              <div
                className={`${styles.nicknameContainer} ${
                  currentPath === "/" ? styles.light : ""
                }`}
              >
                <strong
                  className={`${styles.nickname} ${
                    currentPath === "/" ? styles.light : ""
                  }`}
                >
                  {nickname}
                </strong>
                님
              </div>

              <div className={styles.imageContainer}>
                <div className={styles.profile}>
                  <img
                    src={
                      profile_image
                        ? profile_image
                        : "/images/default_profile.png"
                    }
                  ></img>
                </div>

                <div className={styles.menu}>
                  <Link className={styles.mypage}>마이페이지</Link>
                  <Link className={styles.logout}>로그아웃</Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.loginContainer}>
            <Link
              to={"/login"}
              className={`${currentPath === "/login" ? styles.active : ""} ${
                currentPath === "/" ? styles.light : ""
              }`}
            >
              Login
            </Link>
          </div>
        )}
      </div>

      <div
        className={`${styles.logoContainer} ${
          currentPath === "/" ? styles.light : ""
        }`}
      >
        <Link
          to={"/"}
          className={`${currentPath === "/" ? styles.active : ""}`}
        >
          Home
        </Link>
      </div>

      <div className={styles.menuContainer}>
        <Link
          to={"/board?page=1"}
          className={`${currentPath === "/board" ? styles.active : ""} ${
            currentPath === "/" ? styles.light : ""
          }`}
        >
          Board
        </Link>
        <Link
          to={"/about"}
          className={`${currentPath === "/about" ? styles.active : ""} ${
            currentPath === "/" ? styles.light : ""
          }`}
        >
          About
        </Link>

        {nickname ? (
          <div className={styles.profileContainer}>
            <div
              className={`${styles.nicknameContainer} ${
                currentPath === "/" ? styles.light : ""
              }`}
            >
              <strong
                className={`${styles.nickname} ${
                  currentPath === "/" ? styles.light : ""
                }`}
              >
                {nickname}
              </strong>
              님
            </div>

            <div className={styles.imageContainer}>
              <div className={styles.profile}>
                <img
                  src={
                    profile_image ? profile_image : "images/default_profile.png"
                  }
                ></img>
              </div>

              <div className={styles.menu}>
                <Link className={styles.mypage}>마이페이지</Link>
                <Link className={styles.logout}>로그아웃</Link>
              </div>
            </div>
          </div>
        ) : (
          <Link
            to={"/login"}
            className={`${currentPath === "/login" ? styles.active : ""} ${
              currentPath === "/" ? styles.light : ""
            }`}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
