import { Link } from "react-router-dom";
import styles from "../css/nav.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Nav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [cookies, setCookie] = useCookies(["accessToken"]); // 쿠키 이름을 배열로 전달합니다.
  const [member, setMember] = useState();
  const [menuOpen, setMenuOpen] = useState(false); // 메뉴 열림 상태

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // 클릭 시 메뉴 열림/닫힘 상태 토글
  };

  useEffect(() => {
    // 쿠키 값 가져오기
    const accessToken = cookies.accessToken; // 'token'이라는 이름의 쿠키 값을 가져옵니다.

    if (!accessToken) {
      return;
    }

    axios
      .get("http://localhost:8080/api/member", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setMember({
          nickname: response.data.nickname,
          profile_image:
            response.data.profile_image || "/images/default_profile.png",
        });
      });
  }, []);

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

        {member ? (
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
                  {member.nickname}
                </strong>
                님
              </div>

              <div className={styles.imageContainer}>
                <div className={styles.profile}>
                  <img src={member.profile_image}></img>
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

        {member ? (
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
                {member.nickname}
              </strong>
              님
            </div>

            <div className={styles.imageContainer}>
              <div className={styles.profile}>
                <img src={member.profile_image}></img>
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
