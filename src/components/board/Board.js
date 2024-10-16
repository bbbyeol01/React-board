import { Link, useSearchParams } from "react-router-dom";
import List from "./List";
import styles from "../../css/board.module.css";

export default function Board() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  return (
    <main>
      <div className="titleContainer">
        <div className="title">게시판</div>
        <Link to={"/board/write"}>
          <button className={styles.writeBtn}>글쓰기</button>{" "}
        </Link>
      </div>
      <div className={styles.board}>
        <List page={page} />
      </div>
    </main>
  );
}
