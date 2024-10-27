import List from "./List";
import Reply from "../../components/board/Reply";
import Post from "./Post";
import GoTop from "../GoTop";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../../css/read.module.css";

export default function Read() {
  const { idx } = useParams(); // URL에서 idx 추출

  const [replys, setReplys] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/reply/${idx}`)
      .then((response) => {
        setReplys(response.data.replys);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <main>
        <GoTop />
        <Post />
        <div className={styles.replyTitle}>
          <div className={styles.length}>{replys.length}개</div>의 댓글
        </div>
        <form className={styles.replyContainer} action="">
          <div className={styles.inputContainer}>
            <img className={styles.profileImage} src="" alt="" />
            <textarea className={styles.reply}></textarea>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.replyBtn}>작성</button>
          </div>
        </form>
        {replys ? replys.map((reply) => <Reply reply={reply}></Reply>) : ""}
        <form className={styles.replyContainer} action="">
          <div className={styles.inputContainer}>
            <img className={styles.profileImage} src="" alt="" />
            <textarea className={styles.reply}></textarea>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.replyBtn}>작성</button>
          </div>
        </form>
        <List page={1} />
      </main>
    </>
  );
}
