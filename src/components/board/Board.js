import { Link, useLocation } from "react-router-dom";
import List from "./List";
import styles from "../../css/board.module.css";
import queryString from "query-string";

export default function Board() {
  const location = useLocation();
  const { page } = queryString.parse(location.search) || 1;

  return (
    <section>
      <div className="titleContainer">
        <div className="title">게시판</div>
        <Link to={"/board/write"}>
          <button className={styles.writeBtn}>글쓰기</button>{" "}
        </Link>
      </div>
      <div className={styles.board}>
        <List page={page} />
      </div>
    </section>
  );
}
