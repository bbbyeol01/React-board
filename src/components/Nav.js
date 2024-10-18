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
      .get("http://localhost:8080/api/kakao/member", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setMember({
          nickname: response.data.nickname,
          profile_image: response.data.profile_image,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <nav>
      <div className={styles.logoContainer}>
        <Link to={"/"} className={currentPath === "/" ? styles.active : ""}>
          Home
        </Link>
      </div>
      <div className={styles.menuContainer}>
        <Link
          to={"/board?page=1"}
          className={currentPath === "/board" ? styles.active : ""}
        >
          Board
        </Link>
        <Link
          to={"/about"}
          className={currentPath === "/about" ? styles.active : ""}
        >
          About
        </Link>

        {member ? (
          <Link to={"/"}>
            <div className={styles.nicknameContainer}>
              <strong className={styles.nickname}>{member.nickname}</strong>님
            </div>
            <div className={styles["profile-image"]}>
              <img src={member.profile_image}></img>
            </div>
          </Link>
        ) : (
          <Link
            to={"/login"}
            className={currentPath === "/login" ? styles.active : ""}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
