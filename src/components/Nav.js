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

  useEffect(() => {
    // 쿠키 값 가져오기
    const accessToken = cookies.accessToken; // 'token'이라는 이름의 쿠키 값을 가져옵니다.

    console.log(accessToken);

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
