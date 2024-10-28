import { Link } from "react-router-dom";
import styles from "../css/login.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function Login() {
  const [info, setInfo] = useState({
    id: "",
    pwd: "",
  });
  const [cookies, setCookie] = useCookies();

  async function kakaoLogin() {
    window.location.href = "http://localhost:8080/auth/kakao";
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInfo((prevState) => ({
      ...prevState,
      [name]: value, // name 속성에 따라 업데이트
    }));
  }

  useEffect(() => {
    console.log(info);
  }, [info]);

  function handleLogin(e) {
    e.preventDefault();
    e.stopPropagation();

    const params = {
      id: info.id,
      pwd: info.pwd,
    };

    axios
      .post("http://localhost:8080/api/login", params)
      .then((response) => {
        console.log(response.data);

        // 현재 시간에 30분을 더한 만료 시간을 계산
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 30);

        setCookie("accessToken", response.data.accessToken, {
          path: "/",
          maxAge: 3600, // 1시간
          expires: expirationTime,
          secure: false, // true는 HTTPS. 개발시 false.
          sameSite: "strict", // 보안 설정
        });
        window.location.href = "http://localhost:3000/";
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <>
      <main className={styles.main}>
        <section className={styles.titleContainer}>
          <div className={styles.title}>로그인</div>
        </section>

        <section className={styles.loginContainer}>
          <form method="post" onSubmit={handleLogin}>
            <div className={styles.inputContainer}>
              <label htmlFor="id">아이디</label>
              <input type="text" id="id" name="id" onChange={handleChange} />
              <label htmlFor="pwd">비밀번호</label>
              <input
                id="pwd"
                type="password"
                name="pwd"
                onChange={handleChange}
              />
            </div>
            <div className={styles.buttonContainer}>
              <button onClick={handleLogin}>로그인</button>
            </div>
          </form>
        </section>

        <button className="" onClick={kakaoLogin}>
          카카오 로그인
        </button>
        <section>
          <Link to={"/"}>회원가입</Link>
        </section>
      </main>
    </>
  );
}
