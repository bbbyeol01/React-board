import { Link } from "react-router-dom";
import styles from "../css/login.module.css";

export default function Login() {
  return (
    <>
      <section>
        <article className="titleContainer">
          <div className="title">로그인</div>
        </article>

        <article>
          <form>
            <input type="text" name="username" placeholder="아이디" />
            <input type="password" name="pwd" placeholder="비밀번호" />
            <button>로그인</button>
          </form>
        </article>

        <article>
          <Link to={"/"}>회원가입</Link>
        </article>
      </section>
    </>
  );
}
