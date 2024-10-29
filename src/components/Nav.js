import { Link } from "react-router-dom";
import styles from "../css/nav.module.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useMemberStore from "../../src/store";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Nav() {
  const ICON_PATH = process.env.REACT_APP_ICON_PATH;
  const location = useLocation();
  const currentPath = location.pathname;
  // const { nickname, profile_image } = useMemberStore();
  const { getMemberInfo } = useMemberStore();
  const [menuOpen, setMenuOpen] = useState(false); // 메뉴 열림 상태
  const [cookies, setCookies] = useCookies(["accessToken"]); // 쿠키 이름을 배열로 전달합니다.
  const [memberInfo, setmemberInfo] = useState({
    nickname: "",
    profile_image: "",
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // 클릭 시 메뉴 열림/닫힘 상태 토글
  };

  // 멤버 정보
  useEffect(() => {
    const fetchMemberInfo = async () => {
      const accessToken = cookies.accessToken; // 'token'이라는 이름의 쿠키 값을 가져옵니다.
      const memberInfo = await getMemberInfo(accessToken);

      setmemberInfo({
        nickname: memberInfo.nickname,
        profile_image: memberInfo.profile_image,
      });
    };

    fetchMemberInfo();
  }, []);

  return (
    <nav>
      <div className={styles.hamburgerMenu} onClick={toggleMenu}>
        <img src={`${ICON_PATH}/hamburger.svg`} />

        {memberInfo ? (
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
                  {memberInfo.nickname}
                </strong>
                님
              </div>

              <div className={styles.imageContainer}>
                <div className={styles.profile}>
                  <img
                    src={
                      memberInfo.profile_image || memberInfo.profile_image == ""
                        ? memberInfo.profile_image
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
        {/* <Link
          to={"/about"}
          className={`${currentPath === "/about" ? styles.active : ""} ${
            currentPath === "/" ? styles.light : ""
          }`}
        >
          About
        </Link> */}

        {memberInfo.nickname ? (
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
                {memberInfo.nickname}
              </strong>
              님
            </div>

            <div className={styles.imageContainer}>
              <div className={styles.profile}>
                <img
                  src={
                    memberInfo.profile_image || memberInfo.profile_image == ""
                      ? memberInfo.profile_image
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
