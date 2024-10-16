import { useEffect, useState } from "react";
import List from "./List";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../../css/post.module.css";
import Reply from "../../components/board/Reply";

export default function Read() {
  const { idx } = useParams(); // URL에서 id 추출

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/board/${idx}`)
      .then((response) => {
        console.log(response);
        setPost(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <h1>존재하지 않는 게시글입니다.</h1>
      </>
    );
  }

  return (
    <>
      <main>
        <section>
          <div className="titleContainer">
            <div className="title">{post.title}</div>
            <div className={styles.buttonContainer}>
              <button className={styles.editBtn}>수정</button>
              <button className={styles.delBtn}>삭제</button>
            </div>
          </div>

          <div>{post.time}</div>
          <div>{post.nickname}</div>
          <div className={styles.content}>{post.content}</div>
        </section>

        <Reply />
        <List page={1} />
      </main>
    </>
  );
}
